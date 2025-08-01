import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductoCard from './ProductCard'; // Asegurate que este nombre coincida con tu archivo

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('❌ Error al cargar productos:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-slate-100 to-white">
      
      {/* Sección Hero o bienvenida */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        <h2 className="text-4xl text-blue-900 font-bold max-w-3xl">
          Encontrá los mejores productos en un solo lugar
        </h2>
        <p className="text-xl text-gray-600 font-light mt-4 max-w-2xl">
          Compra fácil, rápido y seguro. Elegí tu rol y viví una experiencia única como comprador o vendedor.
        </p>
      </div>

      <main className="flex-grow p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Productos Populares</h2>
        <p className="text-gray-600 mb-6">Explorá nuestra tienda para encontrar productos únicos</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.slice(0, 3).map(p => (
            <ProductoCard
              key={p.id}
              nombre={p.producto}
              descripcion={p.descripcion}
              precio={p.precio}
              img_url={p.img_url}
            />
          ))}
        </div>
      </main>

      <Footer 
        piePag="Ecommerce 2025"
        parr="Gracias por visitarnos. ¡Volvé pronto!"
        copyright="© 2025 - Todos los derechos reservados"
      />
    </div>
  );
}

export default Home;