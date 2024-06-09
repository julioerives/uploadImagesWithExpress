import express from 'express';
import router from './routes/uploadFiles';
import { join } from 'path';
const app = express();
app.use("/images",express.static(join(__dirname,"../files/")))
app.use(express.json())
app.use("/upload",router)
app.listen(3000,()=>{
    console.log("Escuchando en el puerto 3000")
})