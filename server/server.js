import express from 'express';
import cors from 'cors';
import db from './db.js';
import usuarios from './usuarios.js';
import productos from './productos.js';
import adminData from './adminData.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.URLFRONTEND, 
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminData);
app.use('/api/usuarios', usuarios);
app.use('/api/productos', productos);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});