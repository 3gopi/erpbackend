const db = require('../config/db');

exports.getAll = (userId, cb) => {
  db.query('SELECT * FROM products WHERE user_id = ?', [userId], cb);
};

exports.create = (data, userId, cb) => {
  const { name, stock, price } = data;
  db.query(
    'INSERT INTO products (name, stock, price, user_id) VALUES (?, ?, ?, ?)',
    [name, stock, price, userId],
    cb
  );
};

exports.update = (id, data, userId, cb) => {
  const { name, stock, price } = data;
  db.query(
    'UPDATE products SET name=?, stock=?, price=? WHERE id=? AND user_id=?',
    [name, stock, price, id, userId],
    cb
  );
};

exports.delete = (id, userId, cb) => {
  db.query('DELETE FROM products WHERE id=? AND user_id=?', [id, userId], cb);
};
