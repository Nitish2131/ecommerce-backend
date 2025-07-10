const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');

// 🔒 Protected route to place an order
router.post('/', verifyToken, async (req, res) => {
  // Debug logs for troubleshooting
  console.log("📨 Request received on /api/orders");
  console.log("🔐 Authorization Header:", req.headers.authorization);
  console.log("🧑‍💻 Decoded User from Token:", req.user);

  try {
    const { items, totalAmount } = req.body;

    // Extra check in case verifyToken didn’t set req.user
    if (!req.user || !req.user.id) {
      return res.status(403).json({ error: "Invalid token or user not authenticated." });
    }

    const newOrder = new Order({
      userId: req.user.id,
      products: items,
      totalAmount,
      status: 'Pending',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Order placement error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
