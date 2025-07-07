require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const paymentRoutes = require('./routes/payment');
const jobRoutes = require('./routes/jobs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(process.env.PORT || 3000, () => console.log('Backend running'));