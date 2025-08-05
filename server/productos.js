import express from 'express';
import db from './db.js';
import multer from 'multer';
import fs from 'fs';
import { storage } from './cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

// Obtener todos los productos
router.get('/producto', async (req, res) => {
  try {
    const [productos] = await db.query('SELECT * FROM productos');
    console.log("Productos recibidos:", productos);
    res.status(200).json(productos);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Subir nuevo producto
router.post('/vendedor', upload.single('imagen'), async (req, res) => {
  try {
    const { producto, descripcion, precio, stock } = req.body;
    const imagen = req.file.path;

    // 👇 ACÁ FALTABA ESTA LLAVE {
    if (!producto || !descripcion || !precio || !stock || !imagen) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const [result] = await db.query(
      `INSERT INTO productos (producto, descripcion, precio, stock, img_url)
       VALUES (?, ?, ?, ?, ?)`,
      [producto, descripcion, parseFloat(precio), parseInt(stock), imagen]
    );

    const [nuevoProducto] = await db.query(
      'SELECT * FROM productos WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(nuevoProducto[0]);
  } catch (err) {
    console.error('❌ Error al guardar producto:', err);
    res.status(500).json({ error: 'Error al guardar producto' });
  }
});

export default router;