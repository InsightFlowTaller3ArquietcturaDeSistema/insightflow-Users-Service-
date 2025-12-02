import jsonwebtoken from 'jsonwebtoken';
import {randomUUID} from 'crypto';
import dotenv from "dotenv";
dotenv.config();

export const generateTokken = (usuario) =>{
    return jsonwebtoken.sign({
        sub: usuario.id,
        username: usuario.nombre,
        jti: randomUUID()
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1h',
        algorithm: 'HS256'
    }
    );
};



