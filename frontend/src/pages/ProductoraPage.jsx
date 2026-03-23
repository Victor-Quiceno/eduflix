// Interfaz administrativa para el listado y control completo de las productoras cinematográficas.
import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora } from '../services/productoraService';

const ProductoraPage = () => {
  // Arreglo principal que guarda cada casa productora obtenida de la base de datos.
  const [productoras, setProductoras] = useState([]);

  // Activa componentes de carga mientras cruzamos los datos por la red web.
  const [loading, setLoading] = useState(false);

  // Objeto reactivo que ata los datos que el usuario rellena en el formulario interactivo.
  const [formData, setFormData] = useState({ _id: '', nombre: '', estado: 'Activo', slogan: '', descripcion: '' });

  // Conmuta de forma limpia el estado para enseñar o desaparecer la ventana central.
  const [showModal, setShowModal] = useState(false);

  // Gatillo que lanza la carga remota al pintar la página únicamente por primera vez.
  useEffect(() => {
    fetchProductoras();
  }, []);

  const fetchProductoras = async () => {
    setLoading(true);
    try {
      const data = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.error('Error al obtener productoras', error);
    } finally {
      setLoading(false);
    }
  };

  // Toma los datos a editar o blanquea el panel y lo prepara para una adición en cero.
  const handleOpenModal = (productora = null) => {
    if (productora) {
      setFormData(productora);
    } else {
      setFormData({ _id: '', nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Escucha todos los teclazos para sincronizar el formulario central en vivo.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Despacha silenciosamente la confirmación a la api y relanza el guardado local.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateProductora(formData._id, {
          nombre: formData.nombre,
          estado: formData.estado,
          slogan: formData.slogan,
          descripcion: formData.descripcion
        });
      } else {
        await createProductora({
          nombre: formData.nombre,
          estado: formData.estado,
          slogan: formData.slogan,
          descripcion: formData.descripcion
        });
      }
      setShowModal(false);
      fetchProductoras();
    } catch (error) {
      console.error('Error al guardar productora', error);
      alert('Hubo un error crítico al intentar comunicarse con los servicios.');
    }
  };

  return (
    <div className="container">
      {/* Botonera superior que alinea los controles según el reglamento de cajas. */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-corporate-blue fw-bold">Gestión de Productoras</h2>
        <button className="btn btn-blue-gray-hover shadow-sm" onClick={() => handleOpenModal()}>
          + Agregar productora
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-corporate-red" role="status">
                <span className="visually-hidden">Consultando datos...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nombre de la Productora</th>
                    <th>Eslogan Oficial</th>
                    <th className="text-center">Vigencia</th>
                    <th>Registro de tiempo</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productoras.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No hay estudios registrados actualmente en esta área de la plataforma.
                      </td>
                    </tr>
                  ) : (
                    productoras.map((prod) => (
                      <tr key={prod._id}>
                        <td className="fw-bold fs-5 text-dark">{prod.nombre}</td>
                        <td className="text-muted fst-italic">"{prod.slogan}"</td>
                        <td className="text-center">
                          {/* Pastillas visuales en cápsula para diagnosticar el estado actual de forma ultra rápida. */}
                          <span className={`badge rounded-pill ${prod.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {prod.estado}
                          </span>
                        </td>
                        <td className="text-muted" style={{ fontSize: '0.8rem' }}>
                          Creación: {new Date(prod.fechaCreacion).toLocaleDateString()}<br />
                          Actualización: {new Date(prod.fechaActualizacion).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(prod)}>
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

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} tabIndex="-1">
          {/* Ubicación del área del formulario expandiéndolo para contener múltiples campos paralelos. */}
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title text-corporate-blue fw-bold">
                  {formData._id ? 'Editar Productora' : 'Nueva Productora'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label text-muted small fw-bold">Firma productora oficial</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Ej. Disney, Paramount, Warner"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label text-muted small fw-bold">Estado en la plataforma</label>
                      <select
                        className="form-select border-start border-4 border-primary"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">El eslogan corporativo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="slogan"
                      placeholder="Lema o frase distintiva..."
                      value={formData.slogan}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Síntesis descriptiva</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      rows="3"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end gap-3 pt-3 border-top">
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

export default ProductoraPage;
