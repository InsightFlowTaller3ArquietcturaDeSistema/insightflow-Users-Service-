import { usersDB } from "../db/Database.js";
import { randomUUID } from "crypto";
import { FunctionUsuario } from "../utils/Usuario.js";
import bcrypt from "bcrypt";
export class UsuarioModelo{

    static  CreateUser(data){
        try{
            const contraHash = bcrypt.hashSync(data.contrasenia,10);
            const nombreCompleto = data.nombre_completo.trimStart() + " " + data.apellidos.trimStart();
            if(FunctionUsuario.existEmail(data.correo)===true){
                return {
                    status:400,
                    message:"El correo ya existe"
                }
            }
            if(FunctionUsuario.existUsername(data.usuario) ===true){
                return {
                    status:400,
                    message:"El usuario ya existe"
                }
            }
            const dataCreate = [randomUUID(),nombreCompleto,data.correo,data.usuario,contraHash,data.fecha_nacimiento,data.direccion,data.telefono,"activo"]
            usersDB.push(dataCreate);
            return {
                status:201,
                data:dataCreate,
                message:"Usuario creado correctamente"
            }
        }catch(error){
            return {
                status:400,
                message:"Error en la creación del usuario"
            }
        }
    }
    static LoginUser(data){
        try{
            const contraseniaHash = FunctionUsuario.usuarioComtrasenia(data.usuario)
            const idUsuario =FunctionUsuario.usuarioId(data.usuario);
            console.log(idUsuario)
            if(idUsuario === null || contraseniaHash === null){
                return {
                    status:400,
                    message:"El usuario no existe"
                }
            }
            console.log(1)
            if(bcrypt.compareSync(data.contrasenia, contraseniaHash)){
                return {
                    message: "Inicio de sesión exitoso",
                    data: [data.usuario,idUsuario],
                    status: 201
                }
            }
            return {
                status:400,
                message:"Error en el usuario o contraseña"
            }

        }catch(error){
            return {
                status:400,
                message:"Error en el login"
            }
        }
    }
    

}