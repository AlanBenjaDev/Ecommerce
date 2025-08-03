import React from "react";
function ProductCard({ nombre, descripcion, precio, img_url }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:scale-105 transition-all">
      <img
        src={`https://ecommerce-qf2e.onrender.com${img_url}`}
        alt={nombre}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-xl font-bold text-gray-800">{nombre}</h3>
      <p className="text-gray-600 text-sm">{descripcion}</p>
      <p className="text-blue-600 font-bold text-lg mt-2">${precio}</p>
    </div>
  );
}
export default ProductCard