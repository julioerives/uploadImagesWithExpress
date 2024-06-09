import { getConnection } from "../database/database";

export const uploadFiles={
    uploadFile:async (req:any,res:any)=>{
        try{
            const connection = await getConnection()
        if(!req.file){
            res.json({message:"Imagen no encontrada"})
            return;
        }
        const {filename,mimetype,path} = req.file
        console.log("Data: ",req.file);
        const insertData = await connection.query(
            "INSERT INTO images (ruta, tipo, nombre) VALUES (?,?,?)",
            [path, mimetype, filename]
        );
        console.log(req.file)
        res.status(200).json({message:"Todo correcto"})
        }catch(err){
            console.error(err);
        }
    },
    getAllImages:async (req:any, res:any)=>{
       try{
        const connection = await getConnection()
        const data = await connection.query("SELECT * FROM images")
        if(data.length <1){
            res.json({message:"Sin datos"})
            return
        }
        res.json({message:"Imagenes encontradas",data:data[0]})
       }catch(e){
        console.error(e)
       }

    }
}