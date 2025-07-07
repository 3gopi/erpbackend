const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const verifyToken = require('./middleware/auth');

const app = express();
connectDB(); // MongoDB connection

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve profile uploads statically
app.use('/uploads', express.static('uploads'));

// ✅ Root check
app.get('/', (req, res) => {
  res.send('ERP Backend is Api!');
});

// ✅ Corrected routes
app.use('/api/erp/auth', authRoutes);
app.use('/api/erp/employees', verifyToken, employeeRoutes);

// ✅ Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
