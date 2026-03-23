import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DirectorPage from './pages/DirectorPage';
import GeneroPage from './pages/GeneroPage';
import ProductoraPage from './pages/ProductoraPage';
import TipoPage from './pages/TipoPage';
import MediaPage from './pages/MediaPage';

// Este es el mockpage
const MockPage = ({ title, desc }) => (
  <div className="card border-0 shadow-sm mt-4 text-center p-5">
    <div className="card-body">
      <h2 className="text-corporate-blue fw-bold mb-3">Módulo: {title}</h2>
      <p className="text-muted lead pb-3">{desc}</p>
      <div className="spinner-border text-corporate-red" role="status">
        <span className="visually-hidden">En construcción...</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/media" />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/generos" element={<GeneroPage />} />
        <Route path="/directores" element={<DirectorPage />} />
        <Route path="/productoras" element={<ProductoraPage />} />
        <Route path="/tipos" element={<TipoPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
