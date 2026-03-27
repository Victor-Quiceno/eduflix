// Interfaz maestra y panel administrativo principal para el catálogo audiovisual inyectado hacia la pantalla del administrador.
import React, { useState, useEffect } from 'react';
import { getMedia, createMedia, updateMedia } from '../services/mediaService';
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';

const MediaPage = () => {
  // Arreglo nativo que recopila y nutre la tabla visible con películas.
  const [medias, setMedias] = useState([]);

  // Arreglos paralelos para rellenar las casillas seleccionables en el formulario maestro.
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Mapa reactivo y totalitario que ata cada entrada descriptiva que ejecuta el publicador.
  const [formData, setFormData] = useState({
    _id: '',
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anhioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  // Evento automático que dispara consultas de red simultáneas nada más iniciar el nodo.
  useEffect(() => {
    loadAllData();
  }, []);

  // Encapsula las redes para optimizar tiempos resolviendo las promesas a la vez (parallel computing).
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [mediaRes, generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
        getMedia(),
        getGeneros(),
        getDirectores(),
        getProductoras(),
        getTipos()
      ]);
      setMedias(mediaRes);
      setGeneros(generosRes);
      setDirectores(directoresRes);
      setProductoras(productorasRes);
      setTipos(tiposRes);
    } catch (error) {
      console.error('Error al cargar datos masivos foráneos', error);
    } finally {
      setLoading(false);
    }
  };

  // EXPLICACIÓN: Filtrado lógico y visual para mostrar puros elementos vigentes.
  // Filtramos la data en bruto usando .filter() evaluando que su estado valga explícitamente "Activo".
  // Cualquier otro estado los expulsa de la variable local en memoria. Los menús desplegables abajo en el formulario 
  // solo pueden leer de estas tres variables podadas, ocultando exitosamente la información deshabilitada.
  const generosActivos = generos.filter(g => g.estado === 'Activo');
  const directoresActivos = directores.filter(d => d.estado === 'Activo');
  const productorasActivas = productoras.filter(p => p.estado === 'Activo');

  // Tipificar carece de columna de estado, por lo que pasan directo.
  const tiposDisponibles = tipos;

  // Engancha lógicamente al botón que llama la atención interrumpiendo fluidamente al usuario.
  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({
        _id: item._id,
        serial: item.serial,
        titulo: item.titulo,
        sinopsis: item.sinopsis,
        url: item.url,
        imagen: item.imagen,
        anhioEstreno: item.anhioEstreno,
        // Extraemos inteligentemente solo el hash por si el backend mandó popular los objetos.
        genero: item.genero?._id || item.genero,
        director: item.director?._id || item.director,
        productora: item.productora?._id || item.productora,
        tipo: item.tipo?._id || item.tipo
      });
    } else {
      setFormData({
        _id: '', serial: '', titulo: '', sinopsis: '', url: '',
        imagen: '', anhioEstreno: '', genero: '', director: '', productora: '', tipo: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload._id) {
        const id = payload._id;
        delete payload._id;
        await updateMedia(id, payload);
      } else {
        delete payload._id;
        await createMedia(payload);
      }
      setShowModal(false);
      loadAllData();
    } catch (error) {
      console.error('Fallo grave en la petición atómica transversal', error);
      alert('Se produjo un cuello de botella al compilar la orden hacia la base en MongoDB.');
    }
  };

  // EXPLICACIÓN: Fallbacks y protecciones en dibujo de gráficos estéticos.
  // Provee fallbacks muy sólidos evaluando el estatus de la variable imagen antes de pintar el DOM.
  const renderPortada = (imgSource) => {
    // Escenario crítico 1: String crudo viene inexistente, nulo o malvadamente compuesto de espacios blancos.
    // Retorna escudo visual con letras indicativas y termina la función de inmediato sin romper nada.
    if (!imgSource || imgSource.trim() === '') {
      return (
        <div className="bg-secondary text-white d-flex align-items-center justify-content-center fw-bold rounded shadow-sm" style={{ width: '80px', height: '110px', fontSize: '11px', textAlign: 'center', padding: '5px' }}>
          Sin Portada
        </div>
      );
    }

    // Si asume formato directo con protocolo, respeta, sino infiere acceso local a recursos en carpeta public/portadas.
    const imageUrl = imgSource.startsWith('http') ? imgSource : `/portadas/${imgSource}`;

    return (
      <img
        src={imageUrl}
        alt="Portada Media"
        className="rounded shadow-sm"
        style={{ width: '80px', height: '110px', objectFit: 'cover' }}
        onError={(e) => {
          // Escenario crítico 2: Sí llegó nombre ("pelicula.jpg") pero ese archivo no ha sido subido localmente o link externo murió.
          // Inyectamos por manipulación javascript nativo un recuadro secundario para que no haya un icono de archivo roto.
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.insertAdjacentHTML('afterend', '<div class="bg-secondary text-white d-flex align-items-center justify-content-center fw-bold rounded shadow-sm" style="width: 80px; height: 110px; font-size: 11px;">Vacío</div>');
        }}
      />
    );
  };

  return (
    <div className="container-fluid px-lg-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-corporate-blue fw-bold mb-0">Catálogo Multimedia</h2>
        </div>
        <button className="btn btn-premium-action shadow" onClick={() => handleOpenModal()}>
          + Nuevo Contenido
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 my-5">
              <div className="spinner-border text-corporate-red" role="status">
                <span className="visually-hidden">Generando catálogo de medios vitales...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark bg-corporate-blue border-0">
                  <tr>
                    <th className="ps-4">Portada Escénica</th>
                    <th>Título y Serial</th>
                    <th>Atributos </th>
                    <th className="text-center">Controles</th>
                  </tr>
                </thead>
                <tbody>
                  {medias.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted fw-bold">Esperando tu primer golpe de taquilla audiovisual.</td>
                    </tr>
                  ) : (
                    medias.map((med) => (
                      <tr key={med._id}>
                        <td className="ps-4 py-3">
                          {renderPortada(med.imagen)}
                        </td>
                        <td>
                          <h6 className="fw-bold text-corporate-blue mb-1 fs-5">{med.titulo}</h6>
                          <div className="small text-muted mb-1 badge bg-light text-dark border shadow-sm"><i className="text-corporate-red me-1 fw-bold">#</i> {med.serial}</div>
                          <div className="small text-secondary fw-bold mt-1">Salió en: {med.anhioEstreno}</div>
                        </td>
                        <td style={{ minWidth: "250px" }}>
                          {/* Impresión profunda y escalonada de nexos informativos traídos desde colecciones distantes.*/}
                          <ul className="list-unstyled small mb-0 p-2 bg-light rounded shadow-sm border">
                            <li className="mb-1 border-bottom pb-1"><span className="fw-bold text-dark me-1">➤ Tipo:</span> {med.tipo?.nombre || 'Indefinido/Borrado'}</li>
                            <li className="mb-1 border-bottom pb-1"><span className="fw-bold text-dark me-1">➤ Género:</span> {med.genero?.nombre || 'Indefinido'}</li>
                            <li className="mb-1 border-bottom pb-1"><span className="fw-bold text-dark me-1">➤ Autor:</span> {med.director?.nombre || 'Indefinido'}</li>
                            <li className="pt-1"><span className="fw-bold text-corporate-red me-1">★ Sello:</span> <span className="fw-medium">{med.productora?.nombre || 'Indefinido'}</span></li>
                          </ul>
                        </td>
                        <td className="text-center pe-4">
                          <button className="btn btn-sm btn-outline-corporate-red rounded-1 shadow-sm px-3" onClick={() => handleOpenModal(med)}>
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
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="modal-header bg-corporate-blue text-white border-0 py-3">
                <h5 className="modal-title fw-bold text-uppercase">
                  {formData._id ? 'ACTUALIZAR CONTENIDO AUDIOVISUAL' : 'INGRESAR NUEVO CONTENIDO AUDIOVISUAL'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body p-4 p-md-5 bg-light pb-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4 mb-4">
                    {/* COLUMNA IZQUIERDA: INFORMACIÓN BÁSICA Y CRUDA */}
                    <div className="col-lg-7 border-end pe-lg-4">
                      <h6 className="fw-bold text-corporate-blue mb-4 text-uppercase border-bottom pb-2">DATOS PRINCIPALES E INMUTABLES</h6>

                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label text-muted small fw-bold text-uppercase">CÓDIGO SERIAL</label>
                          <input type="text" className="form-control form-control-lg bg-white shadow-sm fs-6" placeholder="Ej. STR-001" name="serial" value={formData.serial} onChange={handleChange} required />
                        </div>
                        <div className="col-md-8">
                          <label className="form-label text-muted small fw-bold text-uppercase">Título</label>
                          <input type="text" className="form-control form-control-lg bg-white shadow-sm fs-6" name="titulo" value={formData.titulo} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="row g-3 mt-2">
                        <div className="col-12">
                          <label className="form-label text-muted small fw-bold text-uppercase">RUTA DE LA PORTADA</label>
                          <input type="text" className="form-control bg-white shadow-sm" name="imagen" placeholder="Ejemplo: capitan_america_cover.jpg" value={formData.imagen} onChange={handleChange} />
                          <small className="text-secondary" style={{ fontSize: '0.75rem' }}></small>
                        </div>
                      </div>

                      <div className="row g-3 mt-2">
                        <div className="col-md-8">
                          <label className="form-label text-muted small fw-bold text-uppercase">URL DEL VIDEO (REPRODUCCIÓN)</label>
                          <input type="text" className="form-control bg-white shadow-sm" name="url" value={formData.url} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label text-muted small fw-bold text-uppercase">AÑO DE ESTRENO</label>
                          <input type="number" className="form-control bg-white shadow-sm" name="anhioEstreno" value={formData.anhioEstreno} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="form-label text-muted small fw-bold text-uppercase">SINOPSIS</label>
                        <textarea className="form-control bg-white shadow-sm" name="sinopsis" rows="5" value={formData.sinopsis} onChange={handleChange} required></textarea>
                      </div>
                    </div>

                    {/* COLUMNA DERECHA: APUNTADORES ESTRUCTURALES Y DEPENDENCIAS FORÁNEAS */}
                    <div className="col-lg-5 ps-lg-4">
                      <h6 className="fw-bold text-corporate-blue mb-4 text-uppercase border-bottom pb-2">DATOS RELACIONALES</h6>

                      {/* Solamente dibujaremos listas pobladas previamente pasadas por el machetito "Filter == Activo". */}
                      <div className="mb-4">
                        <label className="form-label text-dark small fw-bold text-uppercase">➯ CATEGORÍA</label>
                        <select className="form-select shadow-sm" name="genero" value={formData.genero} onChange={handleChange} required>
                          <option value="">Selecciona un genero</option>
                          {generosActivos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                        </select>
                      </div>

                      <div className="mb-4 pt-2">
                        <label className="form-label text-dark small fw-bold text-uppercase">➯ DIRECTOR</label>
                        <select className="form-select shadow-sm" name="director" value={formData.director} onChange={handleChange} required>
                          <option value="">Selecciona un director</option>
                          {directoresActivos.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
                        </select>
                      </div>

                      <div className="mb-4 pt-2">
                        <label className="form-label text-dark small fw-bold text-uppercase">➯ PRODUCTORA</label>
                        <select className="form-select shadow-sm" name="productora" value={formData.productora} onChange={handleChange} required>
                          <option value="">Cinta proveniente de...</option>
                          {productorasActivas.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                        </select>
                      </div>

                      <div className="mb-3 pt-2">
                        <label className="form-label text-dark small fw-bold text-uppercase">➯ TIPO</label>
                        <select className="form-select shadow-sm bg-light" name="tipo" value={formData.tipo} onChange={handleChange} required>
                          <option value="">Configuración binaria...</option>
                          {tiposDisponibles.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-3 pt-4 border-top mt-5">
                    <button type="button" className="btn btn-outline-secondary px-4 fw-bold" onClick={handleCloseModal}>CANCELAR</button>
                    <button type="submit" className="btn btn-premium-action border-0 px-5 shadow-lg fw-bold text-uppercase">CREAR</button>
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

export default MediaPage;
