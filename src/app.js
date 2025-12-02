import express from 'express';
import { seedUsers } from './db/Seeder.js';
import usuarioRouter from './router/Usuario.js';
const app = express()
const PORT = 3000
app.use(express.json())
seedUsers();
app.use('/Usuario',usuarioRouter)
app.get('/', (req, res) => {
    res.send('Hola, servidor funcionando, los ususarios son');
});

app.listen(PORT,()=>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}`)
})