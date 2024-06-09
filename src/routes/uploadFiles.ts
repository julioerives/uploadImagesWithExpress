import express from 'express';
import multer from 'multer';
import { uploadFiles } from '../controllers/uploadFile';
import { extname, join } from 'path';
import { MYMETYPES } from '../constants/mymeTypes';
const router = express.Router();
const appMulter= multer({
    storage:multer.diskStorage({
    destination:join(__dirname,"../../files"),
    filename:(req,file,cb)=>{
        const fileExtension = file.originalname.split('.')
        const fileName = fileExtension[0];
        cb(null,`${fileName}-${Date.now()}.${fileExtension[1]}`)
    }
    }),
    fileFilter:(req,file,cb)=>{
       if( MYMETYPES.includes(file.mimetype)) cb(null,true);
       else cb(new Error("Archivo no permitido"));
    },
    limits:{
        fieldNameSize:20000000
    }
})
router.post("/upload",appMulter.single('file'), uploadFiles.uploadFile)
router.get("/getImages",uploadFiles.getAllImages)
export default router