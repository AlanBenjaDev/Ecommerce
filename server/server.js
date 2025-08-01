import express from 'express';
import cors from 'cors';
import  pool from'./db.js'
import usuarios from './usuarios.js';
import productos from './productos.js';
import adminData from './adminData.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

app.use('/api/admin', adminData)
app.use('/api/usuarios', usuarios);
app.use('/api/productos', productos);

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});