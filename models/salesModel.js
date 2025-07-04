const db = require('../config/db');

exports.add = (data, userId, cb) => {
  const { product_id, quantity, sale_date } = data;
  db.query(
    'INSERT INTO sales (product_id, quantity, sale_date, user_id) VALUES (?, ?, ?, ?)',
    [product_id, quantity, sale_date, userId],
    cb
  );
};

exports.report = (userId, cb) => {
  const sql = `
    SELECT 
      p.name AS product,
      SUM(s.quantity) AS total_sold,
      SUM(s.quantity * p.price) AS total_revenue
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE s.user_id = ?
    GROUP BY s.product_id
  `;
  db.query(sql, [userId], cb);
};
