const db = require('../config/db');

exports.createUser = (data, cb) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [data.username, data.password], cb);
};

exports.findUserByUsername = (username, cb) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], cb);
};
