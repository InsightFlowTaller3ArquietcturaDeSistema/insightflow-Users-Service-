import { UsuarioController } from "../controller/Ususuario.js";
import { Router } from "express";
import { authJWT } from "../middleware/jwtValidate.js";
import { verifyToken } from "../middleware/verifyToken.js";
const usuarioRouter = Router(); 

usuarioRouter.post('/users',UsuarioController.PostUser);
usuarioRouter.post('/login',UsuarioController.PostLogin)
usuarioRouter.get('/users',authJWT,UsuarioController.getAllUser)
usuarioRouter.get('/users/:id',authJWT,UsuarioController.getIdUsuario)
usuarioRouter.patch('/users/:id',authJWT, UsuarioController.patchUsuario)
usuarioRouter.delete('/users/:id',authJWT, UsuarioController.deleteUsuario)
usuarioRouter.get('/auth/verify', verifyToken, (req,res)=>{
    res.status(200).json({
        authenticated: true,
        user: req.user 
    })
})
export default usuarioRouter;