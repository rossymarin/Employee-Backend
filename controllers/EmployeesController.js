import EmployeesModel from "../models/EmployeesModel.js";

//Metodo crud

//Mostrar Todos
export const getAll = async (req, res) => {
    try {
        const employees = await EmployeesModel.findAll()
        res.json(employees)
    }catch(error) {
        res.json({ message: error.message })
    }
}

//Mostrar Uno
export const getEmployee = async (req, res) => {
    try {
        const employee = await EmployeesModel.findAll({
            where: {id: req.params.id}
        })
        res.json(employee[0])
    }catch(error) {
        res.json({ message: error.message })
    }
}

//crear registro
export const createEmployee = async (req, res) => {
    try {
        await EmployeesModel.create(req.body)
        res.json({
            "message":"Registro completo"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar 
export const updateEmployee = async (req, res) => {
    try {
        await EmployeesModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message":"Registro actualizado"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//eliminar
export const deleteEmployee = async (req, res) => {
    try {
        await EmployeesModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Registro eliminado"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
