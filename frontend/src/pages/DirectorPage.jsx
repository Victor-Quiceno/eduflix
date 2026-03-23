// Componente principal para visualizar y administrar la lista de directores con react.
import React, { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector } from '../services/directorService';

const DirectorPage = () => {
  // Almacena el listado de directores traído de la base de datos.
  const [directores, setDirectores] = useState([]);
  
  // Indica si la aplicación está esperando una respuesta del servidor.
  const [loading, setLoading] = useState(false);
  
  // Controla los valores introducidos por el administrador en el formulario.
  const [formData, setFormData] = useState({ _id: '', nombre: '', estado: 'Activo' });
  
  // Cambia la visibilidad de la ventana emergente modal para agregar o editar.
  const [showModal, setShowModal] = useState(false);

  // Ejecuta la carga de datos únicamente cuando el componente inicia.
  useEffect(() => {
    fetchDirectores();
  }, []);

  const fetchDirectores = async () => {
    setLoading(true);
    try {
      const data = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.error('Error al obtener directores', error);
    } finally {
      setLoading(false);
    }
  };

  // Abre el modal y decide si es para crear un director limpio o editar uno precargado.
  const handleOpenModal = (director = null) => {
    if (director) {
      setFormData(director);
    } else {
      setFormData({ _id: '', nombre: '', estado: 'Activo' });
    }
    setShowModal(true);
  };

  // Cierra la ventana emergente sin aplicar cambios al listado.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Actualiza dinámicamente el estado del formulario cuando el usuario escribe algo.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Intercepta el envío del formulario para procesar la petición y recargar si es exitoso.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateDirector(formData._id, { nombre: formData.nombre, estado: formData.estado });
      } else {
        await createDirector({ nombre: formData.nombre, estado: formData.estado });
      }
      setShowModal(false);
      fetchDirectores();
    } catch (error) {
      console.error('Error al guardar director', error);
      alert('Hubo un error al guardar el director.');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-corporate-blue fw-bold">Gestión de Directores</h2>
        <button className="btn btn-blue-gray-hover shadow-sm" onClick={() => handleOpenModal()}>
          + Nuevo director
        </button>
      </div>

      {/* Renderiza un contenedor elegante para enlistar los datos directivos. */}
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
                    <th>Estado</th>
                    <th>Fechas</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {directores.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">No hay directores registrados.</td>
                    </tr>
                  ) : (
                    directores.map((dir) => (
                      <tr key={dir._id}>
                        <td className="fw-medium">{dir.nombre}</td>
                        <td>
                          {/* Marca visual para distinguir registros activos o dados de baja. */}
                          <span className={`badge ${dir.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {dir.estado}
                          </span>
                        </td>
                        <td className="small text-muted">
                          Creación: {new Date(dir.fechaCreacion).toLocaleDateString()}<br/>
                          Actualización: {new Date(dir.fechaActualizacion).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(dir)}>
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

      {/* Controla qué formulario interactivo mostrar según el estado de la aplicación. */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 bg-light">
                <h5 className="modal-title text-corporate-blue fw-bold">
                  {formData._id ? 'Editar director' : 'Nuevo director'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Nombre del director</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      required 
                    />
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

export default DirectorPage;
