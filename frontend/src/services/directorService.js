// Servicio dedicado a manejar las peticiones del módulo director utilizando axios.
import axios from 'axios';

// Define la url base del backend para los directores.
const API_URL = '/api/directores';

// Retorna la lista de todos los directores usando una petición de lectura.
export const getDirectores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crea un nuevo director enviando sus datos al servidor.
export const createDirector = async (directorData) => {
  const response = await axios.post(API_URL, directorData);
  return response.data;
};

// Actualiza un director existente buscando por su número de id.
export const updateDirector = async (id, directorData) => {
  const response = await axios.put(`${API_URL}/${id}`, directorData);
  return response.data;
};
