import { UsuarioModelo } from "../model/usuario.js";
import {generateTokken} from '../utils/jwt.js';

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
    
    static PostLogin(req,res){
        try{
            const result = UsuarioModelo.LoginUser(req.body)
            if(result.status !==201){
                return res.status(result.status).json(
                    {
                        message:result.message,
                        data:result.data
                    }
                )
            }
            const jwtGenerator = {
                nombre:result.data[0], 
                id: result.data[1]
            };
            const token = generateTokken(jwtGenerator);
            res.cookie('token',token,{
                httpOnly: true,
                sameSite: 'strict',
                maxAge:24*60*60*1000
            })
            return res.status(result.status).json(
                {
                    message:result.message,
                    data:result.data,
                    token:token
                }
            )
        }
        catch(error){
            console.log("Error ? ", error.message)
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })   
        }
    }
}