import express from 'express';
import { getAll, createEmployee, updateEmployee, deleteEmployee, status, inactivos, despedidos, getEmployee} from '../controllers/EmployeesController.js';
const router = express.Router()

router.get('/', getAll)
router.post('/', createEmployee)
router.get('/:id', getEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)
router.post('/status', status)
router.post('/inactivos', inactivos)
router.post('/despedidos', despedidos)
export default router
