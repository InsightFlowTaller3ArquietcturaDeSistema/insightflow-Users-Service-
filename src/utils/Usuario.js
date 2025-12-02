import { usersDB } from "../db/Database.js";
export class FunctionUsuario{
    static usuarioComtrasenia(nombreUsuario){
        const cabezera = usersDB[0]
        const filas = usersDB.slice(1)
        const usuario = filas.find(row => {
            const obj = cabezera.reduce((acc, header, i) => {
                acc[header] = row[i];
                return acc;
        }, {});
        return obj.usuario === nombreUsuario
        })
        return usuario ? rowToObject(cabezera,usuario).contrasenia: null;
    }
    static existEmail(emailUsuario){
        const cabezera = usersDB[0]
        const filas = usersDB.slice(1)
        return filas.some(row =>{
            const obj = rowToObject(cabezera,row);
            return obj.correo === emailUsuario 
        })
    }
    static existUsername(usernameUsuario){
        const cabezera = usersDB[0]
        const filas = usersDB.slice(1)
        return filas.some(row =>{
            const obj = rowToObject(cabezera,row);
            return obj.usuario === usernameUsuario 
        })
    }
    static usuarioId(nombreUsuario){
        const cabezera = usersDB[0]
        const filas = usersDB.slice(1)
        const usuario = filas.find(row => {
            const obj = cabezera.reduce((acc, header, i) => {
                acc[header] = row[i];
                return acc;
        }, {});
        return obj.usuario === nombreUsuario
        })
        console.log(usuario ? rowToObject(cabezera,usuario).id: null)
        return usuario ? rowToObject(cabezera,usuario).id: null;
    }
    
    
}
function rowToObject(headers, row) {
  return headers.reduce((acc, header, i) => {
    acc[header] = row[i];
    return acc;
  }, {});
}
