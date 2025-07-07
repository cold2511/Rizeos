const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
let users = []; // temp in-memory user store

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = { name, email, password: hashed };
  users.push(user);

  const payload = { user: { email: user.email } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const payload = { user: { email: user.email } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;