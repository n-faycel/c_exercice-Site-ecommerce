const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Order } = require('./sequelize');

const app = express();

app.use(cors({
  origin: 'http://localhost:4050',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

app.post('/api/orders', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = await Order.create({ userId, productId, quantity });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);
    if (order) {
      order.status = status;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log('Order service is running on port 4000');
});
