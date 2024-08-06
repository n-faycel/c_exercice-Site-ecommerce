// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users_db',
  password: 'password',
  port: 5432,
});

app.post('/api/users/register', async (req, res) => {
  const { username, password, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    [username, password, email]
  );
  res.status(201).json(result.rows[0]);
});

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
  );
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  res.status(200).json(result.rows[0]);
});

app.listen(3000, () => {
  console.log('User service is running on port 3000');
});
