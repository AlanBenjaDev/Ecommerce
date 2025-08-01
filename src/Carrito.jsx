import React from 'react';
import { useState } from 'react';

function Carrito({ nombre, descripcion, precio,img_url, carrito, setCarrito }) {
  const [cantidad, setCantidad] = useState(0);

  const agregarAlCarrito = () => {
    if (cantidad === 0) return alert("Selecciona al menos una cantidad");

    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      const nuevoCarrito = carrito.map(p =>
        p.nombre === nombre ? { ...p, cantidad: p.cantidad + cantidad } : p
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { nombre, descripcion, precio, cantidad }]);
    }
    setCantidad(0);
  };

  return (
    <div className="bg-gray-300 p-4 m-4 rounded shadow w-64 text-center hover:scale-105">
      <h2 className="text-2xl font-mono text-black">{nombre}</h2>
      <p className="text-lg text-black font-extralight">{descripcion}</p>
      <img src={ `http://localhost:3000${img_url}` } alt={nombre} className="w-full h-48 object-cover-rounded mb-2" />
      <p className="text-lg text-blue-600 font-bold mb-2">${precio}</p>
       
      <button
        onClick={() => setCantidad(cantidad + 1)}
        className="bg-gray-400 font-bold text-lg p-2 w-full hover:bg-gray-700 text-white transition-all duration-300 mb-2"
      >
        Comprar ({cantidad})
      </button>

      <button
        onClick={agregarAlCarrito}
        className="bg-green-500 font-bold text-lg p-2 w-full hover:bg-green-700 text-white transition-all duration-300"
      >
        Agregar al carrito
      </button>

      <p className="text-sm text-gray-600 mt-2">
        Subtotal: ${(precio * cantidad).toFixed(2)}
      </p>
    </div>
  );
}

export default Carrito;