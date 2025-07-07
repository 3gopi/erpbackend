const Employee = require('../models/employeeModel');

e// Get all employees for a user
exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find({ user_id: req.userId });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

// Create a new employee
exports.create = async (req, res) => {
  try {
    const newEmp = new Employee({ ...req.body, user_id: req.userId });
    await newEmp.save();
    res.status(201).json({ message: 'Employee created', employee: newEmp });
  } catch (err) {
    res.status(500).json({ error: 'Error creating employee' });
  }
};

// Update employee
exports.update = async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating employee' });
  }
};

// Delete employee
exports.delete = async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
};