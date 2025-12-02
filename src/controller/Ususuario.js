import { UsuarioModelo } from "../model/usuario.js";

export class UsuarioController{
    static  PostUser(req,res){
        try{
            const result = UsuarioModelo.CreateUser(req.body);
            return res.status(result.status).json({data: result.data, message: result.message })    
        }catch(error){
            console.log("Error ? ", error.message)
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })
        }
    }
    static PostLogin
}