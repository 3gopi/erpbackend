const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ✅ leave blank if using XAMPP default
  database: 'erp_db',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:');
    console.error('Code:', err.code);
    console.error('Message:', err.message);
    return;
  }
  console.log('✅ MySQL connected');
});

module.exports = db;
