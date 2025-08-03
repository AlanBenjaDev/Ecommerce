import React, { useEffect, useState } from 'react';
import Carrito from './Carrito';

function Comprador() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
   const cargarProductos = async () => {
  setCargando(true);
  setError('');
  try {
    const res = await fetch('https://ecommerce-qf2e.onrender.com/api/productos/producto', {
      credentials: 'include' 
    });

    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('La respuesta no es un arreglo');
    }

    setProductos(data);
  } catch (err) {
    console.error('❌ Error al cargar productos:', err);
    setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
  } finally {
    setCargando(false);
  }
};
cargarProductos()
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const productosFiltrados = productos.filter(p =>
    p.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        className="border border-gray-400 rounded p-2 mb-4 w-full max-w-md"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!cargando && !error && (
        <div className="flex flex-wrap justify-center">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(prod => (
              <Carrito
                key={prod.id}
                nombre={prod.producto}
                descripcion={prod.descripcion}
                precio={prod.precio}
                img_url={prod.img_url}
                carrito={carrito}
                setCarrito={setCarrito}
              />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Comprador;