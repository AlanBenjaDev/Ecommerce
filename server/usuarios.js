import express from 'express';
import bcrypt from 'bcrypt';
import db from './db.js';

const router = express.Router();
const saltRounds = 10;

router.post('/register', async (req, res) => {
  try {
    const { user, email, password } = req.body;

    if (!user || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    await db.query(
      'INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)',
      [user, email, hash]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('❌ Error en registro:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const [results] = await db.query(
      'SELECT id, user, email, password FROM usuarios WHERE user = ?',
      [user]
    );

    if (!results || results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const userData = results[0];
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const { password: _, ...userSinPass } = userData;
    res.status(200).json({ message: 'Login exitoso', user: userSinPass });

  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
// PUT - editar usuario
router.put('/usuario/:id', async (req, res) => {
  const { email, role } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      'UPDATE usuarios SET email = ?, role = ? WHERE id = ?',
      [email, role, id]
    );
    res.status(200).json({ message: 'Usuario actualizado' });
  } catch (err) {
    console.error('❌ Error al editar usuario:', err);
    res.status(500).json({ error: 'Error al editar usuario' });
  }
});

// DELETE - borrar usuario
router.delete('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar usuario:', err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

export default router;