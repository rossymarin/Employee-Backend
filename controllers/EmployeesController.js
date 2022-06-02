import EmployeesModel from "../models/EmployeesModel.js";
import csv from 'csvtojson'
import xlsx from 'xlsx'

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

export const importEmployee = async (req, res) => {
    try {
        await EmployeesModel.create(req.body)
        res.json({
            "message":"Registro completo"
        })
    } catch (error) {
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

export const status = async (req, res) => {
    try {
        const activos = await EmployeesModel.count({
            where: {status: "ACTIVE"}
        })
        console.log(typeof activos)
        res.json(activos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const inactivos = async (req, res) => {
    try {
        const activos = await EmployeesModel.count({
            where: {
                status: "INACTIVE",
                jubilado: "si"
            }
        })
        console.log(typeof activos)
        res.json(activos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const despedidos = async (req, res) => {
    try {
        const activos = await EmployeesModel.count({
            where: {
                status: "INACTIVE",
                jubilado: "no"
            }
        })
        console.log(typeof activos)
        res.json(activos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const importEmployees = async (req, res) =>{
        const fileName = "C:/Users/rosym/OneDrive/Documentos/Tec/8/Ingenieria de Datos/Employee-Management/employee-backend/controllers/example-employees.csv";
        console.log("file")
        const excel = xlsx.readFile(fileName);
        const sheetNames = excel.SheetNames;
        const totalSheets = sheetNames.length;
        let parsedData = [];
            for (let i = 0; i < totalSheets; i++) {
                const tempData = xlsx.utils.sheet_to_json(excel.Sheets[sheetNames[i]]);
                tempData.shift();
                parsedData.push(...tempData);
            }
            for (let employee of parsedData){
                if(employee.nomina && employee.nomina.length==0){
                    employee.nomina="!"
                }
                if(employee.nombre && employee.nombre.length==0){
                    employee.nombre="!"
                }
                if(employee.puesto && employee.puesto.length==0){
                    employee.puesto="!"
                }
                if(employee.ubicacion && employee.ubicacion.length==0){
                    employee.ubicacion="!"
                }
                if(employee.correo && employee.correo.length==0){
                    employee.correo="!"
                }
                if(employee.telefono && employee.telefono.length==0){
                    employee.telefono="!"
                }
                if(employee.extension && employee.extension.length==0){
                    employee.extension="!"
                }
                if(employee.status && employee.status.length==0){
                    employee.status="!"
                }
                if(employee.jubilado && employee.jubilado.length==0){
                    employee.jubilado="no"
                }
                if(employee.telefonop && employee.telefonop.length==0){
                    employee.telefonop="!"
                }
                if(employee.correop && employee.correop.length==0){
                    employee.correop="!"
                }
                if(employee.foto && employee.foto.length==0){
                    employee.foto="!"
                }
                if(employee.nomina=="!" && employee.nombre=="!" && employee.puesto=="!" && employee.ubicacion=="!" && employee.correo=="!" && employee.telefono=="!" && employee.extension=="!" && employee.status=="!" && employee.jubilado=="no" && employee.correop=="!" && employee.telefonop=="!" && employee.foto=="!"){
                    console.log("Campos vaciosssss")
                }else{
                    var insertStatement = `INSERT INTO empleados values(null,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    var items = [employee.nomina, employee.nombre, employee.puesto, employee.ubicacion, employee.correo, employee.telefono, employee.extension, employee.status, employee.jubilado==="X" ? employee.jubilado = "si" : employee.jubilado="no", employee.correop, employee.telefonop, employee.foto];
                    console.log(employee)
                    
                    try {
                
                        await EmployeesModel.create({
                            nomina: employee.nomina, 
                            nombre: employee.nombre, 
                            puesto: employee.puesto, 
                            ubicacion: employee.ubicacion,  
                            correo: employee.correo,
                            telefono: employee.telefono,
                            extension: employee.extension,
                            status: employee.status,
                            jubilado: employee.jubilado,
                            correop: employee.correop,
                            telefonop: employee.telefonop,
                            foto: employee.foto,
                        })
                        
                        
                    } catch (error) {
                        res.json({ message: error.message });
                    }
                }
                
       
            }
            res.json({message: "exito"})
           
} 
