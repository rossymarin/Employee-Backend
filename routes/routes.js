import express from 'express';
import { getAll, getEmployee, createEmployee, updateEmployee, deleteEmployee, saveDirectory} from '../controllers/EmployeesController.js';
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getEmployee)
router.post('/', createEmployee)
router.post('/upload', saveDirectory)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router
