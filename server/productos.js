// productoRoutes.js
import express from 'express';
import db from './db.js';
import upload from './upload.js'; // ✅ corregido
const router = express.Router();

// ✅ Obtener todos los productos
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

// ✅ Subir nuevo producto
router.post('/vendedor', upload.single('imagen'), async (req, res) => {
  try {
    const { producto, descripcion, precio, stock } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No se recibió imagen' });
    }

    const imagen = req.file.path;

    if (!producto || !descripcion || !precio || !stock) {
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
