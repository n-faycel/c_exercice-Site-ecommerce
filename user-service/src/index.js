const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize, User, Address } = require("./sequelize");

const app = express();
app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

const JWT_SECRET = "5f2c9e8a0e5f9b2a4b2d5a1e2c3b4e5d6f7a8b";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Authorization header missing");
  }
};

app.post("/api/users/register", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await User.create({ firstname, lastname, email, phone, password: hashedPassword });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await User.findOne({ where: { email } });
    if (client && await bcrypt.compare(password, client.password)) {
      const token = jwt.sign(
        { id: client.id, email: client.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/addresses", authenticateJWT, async (req, res) => {
  try {
    const { userid, street, city, postalCode, country } = req.body;
    const address = await Address.create({ userid, street, city, postalCode, country });
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/users/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findByPk(id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/users/:id/addresses", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const addresses = await Address.findAll({ where: { clientId: id } });
    if (addresses.length > 0) {
      res.status(200).json(addresses);
    } else {
      res.status(404).json({ message: "Addresses not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Client service is running on port 3000");
});
