import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import employeeRoutes from "./routes/routes.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use('/employees', employeeRoutes)

try {
    await db.authenticate()
    console.log('Conexion exitosa a la db')
} catch (error) {
    console.log(`El error es: ${error}`)
}

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(8000, ()=>{
    console.log('Server up running in http://localhost:8000/')
})