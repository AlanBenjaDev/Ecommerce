import express from 'express';
import pool from './db.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Configuración multer para uploads de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta uploads debe existir
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Obtener todos los productos
router.get('/producto', async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos');
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
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    if (!producto || !descripcion || !precio || !stock || !imagen) {
      // Si hubo upload, borrar archivo
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Faltan datos del producto o imagen' });
    }

    const [result] = await pool.query(
      `INSERT INTO productos (producto, descripcion, precio, stock, img_url)
       VALUES (?, ?, ?, ?, ?)`,
      [producto, descripcion, parseFloat(precio), parseInt(stock), imagen]
    );


    const [nuevoProducto] = await pool.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);

    res.status(201).json(nuevoProducto[0]);
  } catch (err) {
    console.error('❌ Error al guardar producto:', err);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Error al guardar producto' });
  }
});
// PUT - editar producto
router.put('/producto/:id', async (req, res) => {
  const { producto, descripcion, precio, stock } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
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
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar producto:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});


export default router;