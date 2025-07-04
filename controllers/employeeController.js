const Employee = require('../models/employeeModel');

exports.getEmployees = (req, res) => {
  Employee.getAll(req.userId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.addEmployee = (req, res) => {
  Employee.create(req.body, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Failed to add employee' });
    else res.json({ message: 'Employee added' });
  });
};

exports.updateEmployee = (req, res) => {
  Employee.update(req.params.id, req.body, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Failed to update employee' });
    else res.json({ message: 'Employee updated' });
  });
};

exports.deleteEmployee = (req, res) => {
  Employee.delete(req.params.id, req.userId, (err) => {
    if (err) res.status(500).json({ error: 'Failed to delete employee' });
    else res.json({ message: 'Employee deleted' });
  });
};
