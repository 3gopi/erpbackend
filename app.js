const express = require('express');
const cors = require('cors');
// You can replace body-parser with express built-in parsers
// const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const verifyToken = require('./middleware/auth');

const app = express();
connectDB();

app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root
// Respond to /api/erp/
app.get('/', (req, res) => {
  res.send('✅ ERP API is running!');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', verifyToken, employeeRoutes);
app.use('/api/products', verifyToken, productRoutes);
app.use('/api/sales', verifyToken, salesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
