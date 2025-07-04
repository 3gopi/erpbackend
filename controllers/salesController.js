const Sales = require('../models/salesModel');

exports.addSale = (req, res) => {
  Sales.add(req.body, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Failed to add sale' });
    else res.json({ message: 'Sale recorded' });
  });
};

exports.getReport = (req, res) => {
  Sales.report(req.userId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};
