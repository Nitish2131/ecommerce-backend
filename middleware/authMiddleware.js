const jwt = require('jsonwebtoken');
const SECRET_KEY = "ecom123"; // ideally from .env

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
