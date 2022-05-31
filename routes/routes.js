import express from 'express';
import { getAll, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controllers/EmployeesController.js';
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getEmployee)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router