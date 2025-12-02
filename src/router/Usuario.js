import { UsuarioController } from "../controller/Ususuario.js";
import { Router } from "express";
const usuarioRouter = Router(); 

usuarioRouter.post('/users',UsuarioController.PostUser);
usuarioRouter.post('/login',UsuarioController.PostLogin)

export default usuarioRouter;