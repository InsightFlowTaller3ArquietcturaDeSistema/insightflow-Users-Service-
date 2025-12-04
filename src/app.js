import express from 'express';
import { seedUsers } from './db/Seeder.js';
import usuarioRouter from './router/Usuario.js';
import cookieParser from "cookie-parser";
import {corsMiddleware} from './middleware/cors.js'
import dotenv from "dotenv";
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)
seedUsers();

app.use('/usuario',usuarioRouter)
app.get('/', (req, res) => {
    res.send('Hola, servidor funcionando, los ususarios son');
});

app.listen(PORT,()=>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}`)
})