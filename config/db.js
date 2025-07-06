const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(express.json());

// Example default route
app.get('/', (req, res) => {
  res.send('ERP MongoDB Backend is working!');
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
