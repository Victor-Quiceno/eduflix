// Interfaz para gestionar las clasificaciones globales del catálogo en el sistema web.
import React, { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo } from '../services/tipoService';

const TipoPage = () => {
  // Arreglo de datos que almacena los tipos traídos desde la red general.
  const [tipos, setTipos] = useState([]);

  // Detiene las interacciones mostrando un giro visual mientras la página cruza información con el servidor.
  const [loading, setLoading] = useState(false);

  // Consolida y empaqueta los valores precisos que se escriben en el formulario central por el administrador.
  const [formData, setFormData] = useState({ _id: '', nombre: '', descripcion: '' });

  // Decide mediante variables de estado si el cuadro modal se proyecta sobre la pantalla activa o si se esconde por completo.
  const [showModal, setShowModal] = useState(false);

  // Gatillo asíncrono que invoca la consulta general y pinta la tabla en su primer nacimiento por ciclo de vida.
  useEffect(() => {
    fetchTipos();
  }, []);

  // Función asíncrona dedicada que jala estrictamente la información de los servicios de back para hidratar el componente.
  const fetchTipos = async () => {
    setLoading(true);
    try {
      const data = await getTipos();
      setTipos(data);
    } catch (error) {
      console.error('Error al obtener los tipos', error);
    } finally {
      setLoading(false);
    }
  };

  // Precarga estratégicamente los datos en el layout si vamos a editar, o lo vacía si planeamos lanzar un alta manual.
  const handleOpenModal = (tipo = null) => {
    if (tipo) {
      setFormData(tipo);
    } else {
      setFormData({ _id: '', nombre: '', descripcion: '' });
    }
    setShowModal(true);
  };

  // Quita de la visión la caja emergente omitiendo cualquier guardado en la red.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Reacciona y captura fluidamente cada tecla ingresada al formulario inyectándola al objeto principal instantáneamente.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Inicia la petición bloqueando su naturaleza default recargando la tabla global si la capa uno termina bien.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateTipo(formData._id, {
          nombre: formData.nombre,
          descripcion: formData.descripcion
        });
      } else {
        await createTipo({
          nombre: formData.nombre,
          descripcion: formData.descripcion
        });
      }
      setShowModal(false);
      fetchTipos();
    } catch (error) {
      console.error('Error al intentar confirmar el tipo', error);
      alert('Surgió un error inesperado al conectar con el baúl de datos remotos.');
    }
  };

  return (
    <div className="container">
      {/* Caja directiva que sitúa los mandos y textos de forma distribuida en el eje maestro transversal. */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-corporate-blue fw-bold">Gestión de Tipos</h2>
        <button className="btn btn-blue-gray-hover shadow-sm" onClick={() => handleOpenModal()}>
          + Registrar clasificación
        </button>
      </div>

      {/* Recipiente general para dotar a las hileras de la tabla con sombras suaves y esquinas muy corporativas. */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-corporate-red" role="status">
                <span className="visually-hidden">Revisando registros directos...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nombre de Clasificación</th>
                    <th>Concepto o Descripción</th>
                    <th>Marcas de Tiempo</th>
                    <th className="text-center">Controles</th>
                  </tr>
                </thead>
                <tbody>
                  {tipos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">
                        Aún no tienes clasificaciones registradas, te invitamos a sumar la primera como Serie o Película.
                      </td>
                    </tr>
                  ) : (
                    tipos.map((tipo) => (
                      <tr key={tipo._id}>
                        <td className="fw-bold fs-5 text-corporate-blue">{tipo.nombre}</td>
                        <td className="text-muted" style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {tipo.descripcion}
                        </td>
                        <td className="text-muted small">
                          Creación: {new Date(tipo.fechaCreacion).toLocaleDateString()}<br />
                          Actualización: {new Date(tipo.fechaActualizacion).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary fw-medium px-3 rounded-2" onClick={() => handleOpenModal(tipo)}>
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

      {/* Determina el montaje de la capa tipo modal dependiendo puramente su flanco lógico de encendido. */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} tabIndex="-1">
          {/* Centra permanentemente el formulario verticalmente, garantizando toda la armonía visual superior. */}
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px' }}>
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title text-corporate-blue fw-bold">
                  {formData._id ? 'Editar Clasificación' : 'Nueva Clasificación'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold text-uppercase">CLAVE DE CLASIFICACIÓN</label>
                    <input
                      type="text"
                      className="form-control form-control-lg fs-6"
                      name="nombre"
                      placeholder="Ejemplo: Serie, Película, Cortometraje, etc."
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small fw-bold text-uppercase">Descripción del formato web</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      rows="4"
                      placeholder="Ingrese la descripción aquí"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end gap-3 pt-4 border-top border-light">
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

export default TipoPage;
