import { usersDB } from "../db/Database.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
export class UsuarioModelo{

    static  CreateUser(data){
        try{
            const contraHash = bcrypt.hashSync(data.contrasenia,10);
            const nombreCompleto = data.nombre_completo.trimStart() + " " + data.apellidos.trimStart();
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
    
    

}