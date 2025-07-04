const db = require('../config/db');

exports.getAll = (userId, cb) => {
  db.query('SELECT * FROM employees WHERE user_id = ?', [userId], cb);
};

exports.create = (data, userId, cb) => {
  const { name, position, department, salary } = data;
  db.query('INSERT INTO employees (name, position, department, salary, user_id) VALUES (?, ?, ?, ?, ?)', 
    [name, position, department, salary, userId], cb);
};

exports.update = (id, data, userId, cb) => {
  const { name, position, department, salary } = data;
  db.query('UPDATE employees SET name=?, position=?, department=?, salary=? WHERE id=? AND user_id=?',
    [name, position, department, salary, id, userId], cb);
};

exports.delete = (id, userId, cb) => {
  db.query('DELETE FROM employees WHERE id=? AND user_id=?', [id, userId], cb);
};
