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


router.post('/vendedor', upload.single('imagen'), async (req, res) => {
  try {
    const { producto, descripcion, precio, stock } = req.body;
   const imagen = req.file.path;
    if (!producto || !descripcion || !precio || !stock || !imagen) {

    const [result] = await db.query(
      `INSERT INTO productos (producto, descripcion, precio, stock, img_url)
       VALUES (?, ?, ?, ?, ?)`,
      [producto, descripcion, parseFloat(precio), parseInt(stock), imagen]
    );


    const [nuevoProducto] = await db.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);

    res.status(201).json(nuevoProducto[0]);
  } catch (err) {
    console.error('❌ Error al guardar producto:', err);

    res.status(500).json({ error: 'Error al guardar producto' });
  }
});

router.put('/producto/:id', async (req, res) => {
  const { producto, descripcion, precio, stock } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      'UPDATE productos SET producto = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
      [producto, descripcion, precio, stock, id]
    );
    res.status(200).json({ message: 'Producto actualizado' });
  } catch (err) {
    console.error('❌ Error al editar producto:', err);
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

// DELETE - borrar producto
router.delete('/producto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar producto:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});


export default router;