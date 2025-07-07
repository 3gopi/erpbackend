const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verifyToken = require('../middleware/auth');

// GET all employees
router.get('/', verifyToken, employeeController.getEmployees);

// POST create employee
router.post('/', verifyToken, employeeController.createEmployee);

// PUT update employee
router.put('/:id', verifyToken, employeeController.updateEmployee);

// DELETE employee
router.delete('/:id', verifyToken, employeeController.deleteEmployee);

module.exports = router;
