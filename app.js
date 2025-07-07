const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const verifyToken = require('./middleware/auth');

const app = express();
connectDB(); // 👈 MongoDB connection

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('ERP Backend is Api!');
});

// Auth route (open)
app.use('/api/auth', authRoutes);

// Employee route (protected)
app.use('/api/employees', verifyToken, employeeRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
