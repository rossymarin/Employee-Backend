import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import employeeRoutes from "./routes/routes.js"
import multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    //let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    console.log(file)
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })
const app = express();

app.use(cors())
app.use(express.json())
app.use('/employees',upload.single('file'), employeeRoutes)

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
