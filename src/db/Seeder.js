import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { usersDB } from "./Database.js";




export function seedUsers() {
  const fakeUsers = [
    {
      nombre_completo: "Francisco Concha",
      correo: "francisco@insightflow.cl",
      usuario: "FranciscoUwu",
      contrasenia: "1234segura",
      fecha_nacimiento: "2001/08/29",
      direccion: "Direccion1",
      telefono:"+56 9  1234 5678",
      estado: "activo",
    },
    {
      nombre_completo: "Ana",
      correo: "ana@insightflow.cl",
      usuario: "UsuarioANA",
      contrasenia: "claveAna",
      fecha_nacimiento: "1995/05/10",
      direccion: "Direccion2",
      telefono:"+56 9  9876 5432",
      estado: "inactivo",
    },
    {
      nombre_completo: "Luis",
      correo: "luis@insightflow.cl",
      usuario: "UsuarioLuis",
      contrasenia: "passLuis",
      fecha_nacimiento: "1998/11/20",
      direccion: "Direccion3",
      telefono:"+56 9  1234 7899",
      estado: "activo",
    },
    {
      nombre_completo: "Felipe",
      correo: "felipe@insightflow.cl",
      usuario: "UsuarioFelipe",
      contrasenia: "passFelipe",
      fecha_nacimiento: "2000/01/15",
      direccion: "Direccion4",
      telefono:"+56 9  1111 2222",
      estado: "activo",
    },
  ];

  for (const user of fakeUsers) {
    const hashedPassword = bcrypt.hashSync(user.contrasenia, 10);
    usersDB.push([
      randomUUID(),
      user.nombre_completo,
      user.correo,
      user.usuario,
      hashedPassword,
      user.fecha_nacimiento,
      user.direccion,
      user.telefono,
      user.estado,
    ]);
  }
}
seedUsers()
console.log(usersDB)