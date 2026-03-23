// Envoltorio principal que estructura las páginas de la aplicación.
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Muestra la barra superior en toda la aplicación de forma constante. */}
      <Navbar />
      
      {/* Zona dinámica que inyecta las pantallas específicas según la ruta visitada. */}
      <main className="flex-grow-1 bg-light py-5">
        <div className="container">
          {children}
        </div>
      </main>
      
      {/* Inserta el pie de página institucional al final de la pantalla. */}
      <Footer />
    </div>
  );
};

export default Layout;
