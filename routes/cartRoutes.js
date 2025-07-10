const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST: Add to cart
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: View all carts (for now, no auth)
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products.productId');
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
