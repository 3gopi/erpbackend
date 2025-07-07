const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root
app.get('/', (req, res) => {
  res.send('ERP Backend is Api!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', verifyToken, employeeRoutes);
app.use('/api/products', verifyToken, productRoutes);
app.use('/api/sales', verifyToken, salesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
