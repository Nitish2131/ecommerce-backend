const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors");
require('dotenv').config();

dotenv.config();

app.use(cors());

app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);




const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('E-Commerce Backend is Running');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
