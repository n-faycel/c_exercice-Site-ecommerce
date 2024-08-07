const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { sequelize, User } = require("./sequelize");

const app = express();

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:4050',  // Autoriser cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Autoriser ces méthodes
  allowedHeaders: ['Content-Type', 'Authorization']  // Autoriser ces en-têtes
}));
app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

app.post("/api/users/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.status(201);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("User service is running on port 3000");
});
