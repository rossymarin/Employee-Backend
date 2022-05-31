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
export const importEmployees = async () =>{
        const fileName = "example-employees.csv";

        csv().fromFile(fileName).then(source => {
            for (var i = 0; i < source.length; i++) {
                var nomina = source[i]["nomina"],
                    nombre = source[i]["nombre"],
                    puesto = source[i]["puesto"],
                    ubicacion = source[i]["ubicacion"],
                    correo = source[i]["correo"],
                    telefono = source[i]["telefono"],
                    extension = source[i]["extension"],
                    status = source[i]["status"],
                    jubilado = source[i]["jubilado"],
                    correop = source[i]["correop"],
                    telefonop = source[i]["telefonop"],
                    foto = source[i]["foto"]
                    
                    if(nomina.length===0){nomina="!"}
                    if(nombre.length===0){ nombre="!"}
                    if(puesto.length===0){puesto="!"}
                    if(ubicacion.length===0){ubicacion="!"}
                    if(correo.length===0){ correo="!"}
                    if(telefono.length===0){ telefono="!" }
                    if(extension.length===0){ extension="!" }
                    if(status.length===0){ status="!" }
                    if(jubilado.length===0){ jubilado="no" }
                    if(telefonop.length===0){ telefonop="!" }
                    if(correop.length===0){ correop="!"}
                    if(foto.length===0){ foto="!" }

                    if(nomina==="!" && nombre==="!" && puesto==="!" && ubicacion==="!" && correo==="!" && telefono==="!" && extension==="!" && status==="!" && correop==="!" && telefonop==="!" && foto==="!"){
                        console.log("Campos vaciosssss")
                    }else{
                        if (jubilado==="X") {
                            jubilado = "si"
                        }
                        var insertStatement = `INSERT INTO empleados values(null,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                        var items = [nomina, nombre, puesto, ubicacion, correo, telefono, extension, status, jubilado, correop, telefonop, foto];
                        
                        try {
        await EmployeesModel.create(insertStatement,items)
        console.log("insertado")
    } catch (error) {
        console.log("error")
    }
                    }
            }  
        });
     res.json({
            "message":"Registro completo"
        })
    } 
