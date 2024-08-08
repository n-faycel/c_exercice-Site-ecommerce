const express = require("express");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(bodyParser.json());

// Configuration des microservices
const userService = "http://localhost:3000";
const productService = "http://localhost:6000";
const orderService = "http://localhost:4000";

// Middleware d'authentification JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    // Validation du token (à adapter selon votre configuration)
    jwt.verify(token, JWT_SECRET, (err, user) => {
      console.log("totot");
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

// Routes vers les microservices
app.use(
  "/api/users",
  authenticateJWT,
  createProxyMiddleware({ target: userService, changeOrigin: true })
);
app.use(
  "/api/products",
  authenticateJWT,
  createProxyMiddleware({ target: productService, changeOrigin: true })
);
app.use(
  "/api/orders",
  authenticateJWT,
  createProxyMiddleware({ target: orderService, changeOrigin: true })
);

// Démarrer le serveur API Gateway
app.listen(7000, () => {
  console.log("API Gateway is running on port 7000");
});
