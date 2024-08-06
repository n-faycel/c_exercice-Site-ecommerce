// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'orders_db',
  password: 'password',
  port: 5432,
});

app.post('/api/orders', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [userId, productId, quantity]
  );
  res.status(201).json(result.rows[0]);
});

app.get('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  res.status(200).json(result.rows[0]);
});

app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  res.status(200).json(result.rows[0]);
});

app.listen(4000, () => {
  console.log('Order service is running on port 4000');
});
