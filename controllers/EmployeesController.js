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
export const saveDirectory = async() => {
  try{
      if(req.file){
      const excel = xlsx.readFile(req.file);
      const sheetNames = excel.SheetNames;
      const totalSheets = sheetNames.length;
      let parsedData = [];
  for (let i = 0; i < totalSheets; i++) {
      const tempData = xlsx.utils.sheet_to_json(excel.Sheets[sheetNames[i]]);
      tempData.shift();
      parsedData.push(...tempData);
  }
  var employeeQuery = new Parse.Query(Employee)
  let i = 0;
  for(let item of parsedData){
  //let item = parsedData[i];
  employeeQuery.equalTo('nomina',+item.nomina);
  let result = await employeeQuery.find();
  let isSave = null
  if(result.length>0){
      let employeeUpdate = result[0];
      employeeUpdate.save()
      .then(employee=>{
          employee.set("nominaId",""+item.nomina);
          employee.set("nomina",+item.nomina);
          employee.set("name",item.nombre);
          employee.set("job",item.puesto);
            employee.set("location",item.ubicacion);
            employee.set("companyEmail",item.email);
            employee.set("companyPhone",""+item.telefono)
            employee.set("personalPhone",""+item.telefonopersonal);
            employee.set("extension",""+item.extension);
            employee.set("status",item.status === "ACTIVE"?true:false);
            employee.set("retired",item.jubilado == "x"?true:false);
            employee.set("personalEmail",item.emailpersonal);
            employee.set("imageUrl",item.foto);
            return employee.save();
        })
        console.log("existe"+i)
    }else{
        let employee = new Employee();
        isSave = await employee.save({
        nomina: +item.nomina,
        nominaId: ""+item.nomina,
        name: item.nombre,
        job: item.puesto,
        location: item.ubicacion,
        companyEmail: item.email,
        companyPhone: ""+item.telefono,
        extension: ""+item.extension,
        status: item.status === "ACTIVE"?true:false,
        retired: item.jubilado == "x"?true:false,
        personalEmail: item.emailpersonal,
        personalPhone: ""+item.telefonopersonal,
        imageUrl: item.foto
      });
      console.log("no existe" + i)
    }
    i++;
  }
    
  console.log("Directorio actualizado correctamente.")
  }else{
      console.log("El directorio ya estaba actualizado.")
  }
  
  return true;
  }catch(error){
      console.log("Ha ocurrido un error actualizando el directorio.")
      return false;
  }
}
