const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Shopping Cart API is running');
});

app.get('/api/products', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.status(503).json({
        message: 'MongoDB connection is not configured yet'
      });
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const products = await client
      .db('shoppingCartDB')
      .collection('products')
      .find({})
      .toArray();

    await client.close();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
