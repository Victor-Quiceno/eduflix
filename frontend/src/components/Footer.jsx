// Componente de pie de página para mostrar la marca oficial e información.
import React from 'react';
import logoU from '../assets/iudigital_logo.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary border-3">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Sección que presenta el logotipo y nombre de la universidad. */}
          <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
            <img src={logoU} alt="IU Digital Logo" height="85" className="mb-2" />
            <h5 className="text-corporate-red fw-bold mb-0 mt-3">IU Digital de Antioquia</h5>
            <p className="small text-muted mb-0">Educación al alcance de todos.</p>
          </div>
          
          {/* Bloque con medios de contacto directo. */}
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <h6 className="fw-bold text-uppercase mb-3">Contacto Institucional</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2">📞 Teléfono: (+57) 604 520 07 50</li>
              <li className="mb-2">📧 Email: atencionalciudadano@iudigital.edu.co</li>
              <li>📍 Dirección: Cra 55 # 42 90 INT 0101 - Medellín, Antioquia</li>
            </ul>
          </div>
          
          {/* Enlaces y botones hacia los perfiles sociales de la institución. */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="fw-bold text-uppercase mb-3">Redes Sociales</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-2">
              <a href="https://www.facebook.com/soyiudigital/" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}>f</a>
              <a href="https://x.com/IUDIGITAL" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}>X</a>
              <a href="https://www.linkedin.com/school/iu-digital-de-antioquia-oficial/?originalSubdomain=co" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}>in</a>
            </div>
          </div>
        </div>
        
        {/* Línea divisoria y créditos de derecho de autor del sistema. */}
        <hr className="border-secondary mt-4 mb-3" />
        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} Eduflix - Proyecto Académico Administrador. Victor Quiceno.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
