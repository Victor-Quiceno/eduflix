// Servicio dedicado a manejar las peticiones del catálogo audiovisual principal utilizando axios.
import axios from 'axios';

// Define la url de conexión hacia el recurso remoto responsable de la librería de media.
const API_URL = '/api/media';

// Extrae el listado transversal completo desde la base de datos.
export const getMedia = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Transmite al servidor el bloque jerárquico conteniendo referencias complejas a otros datos.
export const createMedia = async (mediaData) => {
  const response = await axios.post(API_URL, mediaData);
  return response.data;
};

// Sustituye o actualiza las propiedades primarias de un video apuntando a su id real de atlas.
export const updateMedia = async (id, mediaData) => {
  const response = await axios.put(`${API_URL}/${id}`, mediaData);
  return response.data;
};
