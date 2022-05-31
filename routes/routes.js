import express from 'express';
import { getAll, getEmployee, createEmployee, updateEmployee, deleteEmployee, saveDirectory, importEmployee} from '../controllers/EmployeesController.js';
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getEmployee)
router.post('/', createEmployee)
router.post('/upload', saveDirectory)
router.get('/import', importEmployees)
router.post('/import', importEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router
