import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EmployeesModel = db.define('empleados', {
    nomina: { type: DataTypes.STRING },
    nombre: {type: DataTypes.STRING},
    puesto: {type: DataTypes.STRING},
    ubicacion: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING},  
    extension: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    jubilado: {type: DataTypes.STRING},
    correop: {type: DataTypes.STRING},
    telefonop: {type: DataTypes.STRING},
    foto: {type: DataTypes.STRING},
}, {
    timestamps: false
})

export default EmployeesModel