const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { sequelize, Product } = require("./sequelize");

const app = express();

app.use(cors({
  origin: 'http://localhost:4050',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

app.post("/api/products", async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.create({ name, price, description });
  res.status(201).json(product);
});

app.get("/api/products", async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const product = await Product.findByPk(id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    await product.save();
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    res.status(204).json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(5000, () => {
  console.log("Product service is running on port 5000");
});
