// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;
export const registroUsuario = async(user,email,password) =>{
    try{
        const res =await fetch(`${API_URL}/usuarios/register`,{
     method: 'POST',
    headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({user,email,password})

        })
         const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al registrarte');
    return data;
  } catch (error) {
    throw error;
  }
    }

export const loginUsuario = async (user, password) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
    return data;
  } catch (error) {
    throw error;
  }
};

export const subirProducto = async ({producto,descripcion,precio,stock,imagen}) => {
  try {
    const res = await fetch(`${API_URL}/productos/vendedor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto,descripcion,precio,stock,imagen }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al subir producto');
    return data;
  } catch (error) {
    throw error;
  }
};

export const verProductos = async () => {
  try {
    const res = await fetch(`${API_URL}/productos/producto`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener productos');
    return data;
  } catch (error) {
    throw error;
  }
};
