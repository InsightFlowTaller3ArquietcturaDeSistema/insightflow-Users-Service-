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
            
            if(idUsuario === null || contraseniaHash === null){
                return {
                    status:400,
                    message:"El usuario no existe"
                }
            }
            
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
                message:"Error en el login" + error.message
            }
        }
    }
    static TodosDatos(){
        try{
            const cabezera = usersDB[0];
            const filas = usersDB.slice(1);
            if(filas.length ===0){
                return {
                    status:404,
                    message:"No se encontraron datos"
                }
            }
            const mapUsuario = usersDB.slice(1).map(filas=>{
                let obj = {};
                cabezera.forEach((columna,index)=>{
                    if(columna ==="contrasenia" ||columna ==="Direccion" ||columna ==="telefono"){
                        return;
                    }
                    obj[columna] = filas[index]
                });
                return obj
            })

            return {
                status:200,
                data:mapUsuario
            }
        }catch(error)
        {
            return {
                status:400,
                message:"Error en obtener todos los datos " + error.message
            }
        }
    }
    static TodosDatosId(id) {
        try {
            
            const cabezera = usersDB[0];
            const filaEncontrada = usersDB.slice(1).find(fila => fila[0] === id);

            if (!filaEncontrada) {
                return {
                    status: 404,
                    message: "Usuario no encontrado"
                };
            }

            let obj = {};
            cabezera.forEach((columna, index) => {
                if (columna !== "contrasenia" || columna !== "Direccion" || columna !== "telefono") {
                    
                    obj[columna] = filaEncontrada[index];
                }
            });

            return {
                status: 200,
                data: obj
            };
        } catch (error) {
            return {
                status: 400,
                message: "Error en obtener el dato por id: " + error.message
            };
        }
    }
    static actualizarUsuario(data) {
        try {
            const exist = FunctionUsuario.existUsername(data.usuario);
            if(exist){
                return {
                    status:400,
                    message:"El nombre de usuario ya existe"
                }
            }
            const cabezera = usersDB[0];
            const filas = usersDB.slice(1);

            if (filas.length === 0) {
                return {
                    status: 404,
                    message: "No se encontraron datos"
                };
            }

            const indiceFilaEncontrada = filas.findIndex(fila => fila[0] === data.id);

            if (indiceFilaEncontrada === -1) {
                return {
                    status: 404,
                    message: "Usuario no encontrado"
                };
            }

            const indiceReal = indiceFilaEncontrada + 1;
            if (data.contrasenia !== undefined && data.contrasenia !== null) {
                data.contrasenia = bcrypt.hashSync(data.contrasenia, 10);
            }

            cabezera.forEach((columna, i) => {
                // Ignorar id y estado
                if (columna === "id" || columna === "estado") return;

                if (data[columna] !== undefined && data[columna] !== null) {
                    usersDB[indiceReal][i] = data[columna];
                }
            });
            let usuarioActualizado = {};
            cabezera.forEach((columna, index) => {
                usuarioActualizado[columna] = usersDB[indiceReal][index];
            });

            return {
                status: 200,
                message: "Usuario actualizado exitosamente",
                data: usuarioActualizado
            };

        } catch (error) {
            return {
                status: 400,
                message: "Error al actualizar usuario: " + error.message
            };
        }
    }

    static deleteUsuario(data){
        try{
            const cabezera = usersDB[0];
            const filas = usersDB.slice(1);

            if (filas.length === 0) {
                return {
                    status: 404,
                    message: "No se encontraron datos"
                };
            }

            const indiceFilaEncontrada = filas.findIndex(fila => fila[0] === data.id);

            if (indiceFilaEncontrada === -1) {
                return {
                    status: 404,
                    message: "Usuario no encontrado"
                };
            }

            const indiceReal = indiceFilaEncontrada + 1;
            
            if (data.contrasenia !== undefined && data.contrasenia !== null) {
                data.contrasenia = bcrypt.hashSync(data.contrasenia, 10);
            }

            cabezera.forEach((columna, i) => {
                if ( columna === "estado") {usersDB[indiceReal][i] = "inactivo"};
                    
            });
            let usuarioActualizado = {};
            cabezera.forEach((columna, index) => {
                usuarioActualizado[columna] = usersDB[indiceReal][index];
            });

            return {
                status: 200,
                message: "Usuario actualizado exitosamente",
                data: usuarioActualizado
            };

        }catch(error){
            return {
                status: 400,
                message: "Error al actualizar usuario: " + error.message
            };
        }
    }
}