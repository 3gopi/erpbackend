const Sales = require('../models/salesModel');

exports.addSale = (req, res) => {
  Sales.add(req.body, req.userId, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add sale' });
    res.json({ message: 'Sale recorded' });
  });
};

exports.getReport = (req, res) => {
  Sales.report(req.userId, (err, results) => {
    if (err) return res.status(500).send({ error: 'Failed to get report' });
    res.json(results);
  });
};
