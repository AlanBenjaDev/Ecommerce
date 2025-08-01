import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Carrito from './Carrito';
import Create from './Create';
import Comprador from './Comprador';
import Vendedor from './Vendedor';
import Header from './components/Header';
import Footer from './components/Footer';
import Log from './Log';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Header 
        title="Mi E-commerce" 
        subtitle="Compra fácil y rápido" 
        buttonD="Ir al inicio"
        buttonH="Comprar" 
        buttonC="Vender" 
      />
      <Routes>
         <Route path="/" element={<Create />} />
         <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/comprador" element={<Comprador />} />
        <Route path="/vendedor" element={<Vendedor />} />
        <Route path='/login' element={<Log />} />
      </Routes>
      <Footer 
        piePag="E-commerce 2025" 
        parr="Gracias por visitarnos. ¡Volvé pronto!" 
        copyright="© 2025 Alan" 
      />
    </Router>
  );
}

export default App;