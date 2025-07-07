const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const payments = []; // In-memory, replace with DB in production

router.post('/log', auth, (req, res) => {
  const { wallet, txHash, amount } = req.body;
  if (!wallet || !txHash || !amount) {
    return res.status(400).json({ msg: 'Missing payment fields' });
  }
  payments.push({ wallet, txHash, amount, timestamp: Date.now() });
  res.json({ msg: 'Payment logged successfully' });
});

router.get('/verify/:wallet', auth, (req, res) => {
  const { wallet } = req.params;
  const found = payments.find(p => p.wallet === wallet);
  res.json({ paid: !!found });
});

module.exports = router;