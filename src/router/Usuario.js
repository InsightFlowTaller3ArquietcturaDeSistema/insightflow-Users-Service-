import { UsuarioController } from "../controller/Ususuario.js";
import { Router } from "express";
const usuarioRouter = Router(); 

usuarioRouter.post('/users',UsuarioController.PostUser);
usuarioRouter.post('/login',UsuarioController.PostLogin)
usuarioRouter.get('/users',UsuarioController.getAllUser)
usuarioRouter.get('/users/:id',UsuarioController.getIdUsuario)
usuarioRouter.patch('/users/:id', UsuarioController.patchUsuario)
usuarioRouter.delete('/users/:id', UsuarioController.deleteUsuario)
export default usuarioRouter;