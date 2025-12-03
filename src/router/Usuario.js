import { UsuarioController } from "../controller/Ususuario.js";
import { Router } from "express";
import { authJWT } from "../middleware/jwtValidate.js";
const usuarioRouter = Router(); 

usuarioRouter.post('/users',UsuarioController.PostUser);
usuarioRouter.post('/login',UsuarioController.PostLogin)
usuarioRouter.get('/users',authJWT,UsuarioController.getAllUser)
usuarioRouter.get('/users/:id',authJWT,UsuarioController.getIdUsuario)
usuarioRouter.patch('/users/:id',authJWT, UsuarioController.patchUsuario)
usuarioRouter.delete('/users/:id',authJWT, UsuarioController.deleteUsuario)
export default usuarioRouter;