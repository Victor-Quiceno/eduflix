// Componente principal para visualizar y administrar la lista de géneros.
import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero } from '../services/generoService';

const GeneroPage = () => {
  // Almacena el listado de géneros traído de la base de datos.
  const [generos, setGeneros] = useState([]);
  
  // Indica si la aplicación está esperando una respuesta.
  const [loading, setLoading] = useState(false);
  
  // Controla los valores introducidos por el usuario en el formulario.
  const [formData, setFormData] = useState({ _id: '', nombre: '', descripcion: '', estado: 'Activo' });
  
  // Cambia la visibilidad de la ventana emergente modal.
  const [showModal, setShowModal] = useState(false);

  // Carga inicial de datos al renderizar.
  useEffect(() => {
    fetchGeneros();
  }, []);

  // Llama al servicio remoto y actualiza la lista local.
  const fetchGeneros = async () => {
    setLoading(true);
    try {
      const data = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.error('Error al obtener géneros', error);
    } finally {
      setLoading(false);
    }
  };

  // Abre el modal y prepara los datos correspondientes según el usuario.
  const handleOpenModal = (genero = null) => {
    if (genero) {
      setFormData(genero);
    } else {
      setFormData({ _id: '', nombre: '', descripcion: '', estado: 'Activo' });
    }
    setShowModal(true);
  };

  // Cierra el modal sin guardar.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Actualiza el estado cuando el usuario escribe en el formulario.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Procesa la petición a la red y recarga la tabla si el servidor responde con éxito.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateGenero(formData._id, { 
          nombre: formData.nombre, 
          descripcion: formData.descripcion, 
          estado: formData.estado 
        });
      } else {
        await createGenero({ 
          nombre: formData.nombre, 
          descripcion: formData.descripcion, 
          estado: formData.estado 
        });
      }
      setShowModal(false);
      fetchGeneros();
    } catch (error) {
      console.error('Error al guardar género', error);
      alert('Hubo un error al guardar el género.');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-corporate-blue fw-bold">Gestión de Géneros</h2>
        <button className="btn btn-blue-gray-hover shadow-sm" onClick={() => handleOpenModal()}>
          + Nuevo género
        </button>
      </div>

      {/* Contenedor principal de la tabla para protegerla gráficamente. */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-corporate-red" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Fechas</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Comprobación visual de listas vacías. */}
                  {generos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No hay géneros registrados.</td>
                    </tr>
                  ) : (
                    generos.map((gen) => (
                      <tr key={gen._id}>
                        <td className="fw-medium">{gen.nombre}</td>
                        {/* Se limita visualmente la descripción para no dañar la tabla si el texto es muy extenso. */}
                        <td className="small text-muted" style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {gen.descripcion}
                        </td>
                        <td>
                          <span className={`badge ${gen.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {gen.estado}
                          </span>
                        </td>
                        <td className="small text-muted">
                          Creación: {new Date(gen.fechaCreacion).toLocaleDateString()}<br/>
                          Actualización: {new Date(gen.fechaActualizacion).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(gen)}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Controla la ventana de interacción principal del formulario. */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 bg-light">
                <h5 className="modal-title text-corporate-blue fw-bold">
                  {formData._id ? 'Editar género' : 'Nuevo género'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Nombre del género</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Descripción detallada</label>
                    <textarea 
                      className="form-control" 
                      name="descripcion" 
                      rows="3"
                      value={formData.descripcion} 
                      onChange={handleChange} 
                      required 
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Estado en la plataforma</label>
                    <select 
                      className="form-select" 
                      name="estado" 
                      value={formData.estado} 
                      onChange={handleChange}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
                    <button type="button" className="btn btn-light px-4 shadow-sm fw-medium" onClick={handleCloseModal}>Cancelar</button>
                    <button type="submit" className="btn btn-blue-green-hover shadow-sm px-4 fw-medium border-0">Guardar cambios</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneroPage;
