import { UsuarioModelo } from "../model/Usuario.js";
import {generateTokken} from '../utils/jwt.js';
import { 
    crearUsuarioSchema, 
    loginSchema, 
    actualizarUsuarioSchema, 
    eliminarUsuarioSchema,
    obtenerUsuarioPorIdSchema 
} from '../validator/usuario.js';


export class UsuarioController{

    static  PostUser(req,res){
        try{
            const validatedData = crearUsuarioSchema.parse(req.body);

            const result = UsuarioModelo.CreateUser(validatedData);
            return res.status(result.status).json({data: result.data, message: result.message })    
        }catch(error){
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }))
                });
            }
            return res.status(400).json({
                
                message: "Datos invalidos en el registro",
                error:error.message
            })
        }
    }
    
    static PostLogin(req,res){
        try{
            const validatedData = loginSchema.parse(req.body);
            console.log(validatedData)
            const result = UsuarioModelo.LoginUser(validatedData)
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
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }))
                });
            }
            return res.status(400).json({
                message: "Datos invalidos o malos",
                error:error.message
            })   
        }
    }
    static getAllUser(req,res){
        try{

            const result = UsuarioModelo.TodosDatos()
            if(result.status !==200){
                return res.status(result.status).json({
                    message:result.message,
                    data:result.data
                })
            }
            return res.status(result.status).json(
                    {
                        message:result.message,
                        data:result.data
                    }
                )
        }catch(error){
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })   
        }
    }
    static getIdUsuario(req,res){
        try{
            const validatedData = obtenerUsuarioPorIdSchema.parse({ 
                id: req.params.id 
            });
            const result = UsuarioModelo.TodosDatosId(validatedData.id)
            if(result.status !==200){
                return res.status(result.status).json({
                    message:result.message,
                    data:result.data
                })
            }
            return res.status(result.status).json(
                    {
                        message:result.message,
                        data:result.data
                    }
                )
        }catch(error){
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }))
                });
            }
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })   
        }
    }
    static patchUsuario(req,res){
        
        try{
            const data = {
                id: req.params.id,
                ...req.body
            };
            
            
            const validatedData = actualizarUsuarioSchema.parse(data);
            const result = UsuarioModelo.actualizarUsuario(validatedData)
            if(result.status !==200){
                return res.status(result.status).json({
                    message:result.message,
                    data:result.data
                })
            }
            return res.status(result.status).json(
                    {
                        message:result.message,
                        data:result.data
                    }
                )
        }catch(error){
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }))
                });
            }
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })   
        }
    }
    static deleteUsuario(req,res){
        try{
            const validatedData = eliminarUsuarioSchema.parse({ 
                id: req.params.id 
            });
            const result = UsuarioModelo.deleteUsuario(req.params)
            if(result.status !==200){
                return res.status(result.status).json({
                    message:result.message,
                    data:result.data
                })
            }
            return res.status(result.status).json(
                    {
                        message:result.message,
                        data:result.data
                    }
                )
        }catch(error){
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }))
                });
            }
            return res.status(400).json({
                
                message: "Datos invalidos",
                error:error.message
            })  
        }
    }
}
