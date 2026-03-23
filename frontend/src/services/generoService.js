// Servicio dedicado a manejar las peticiones del módulo género utilizando axios.
import axios from 'axios';

// Define la url base del backend para los géneros.
const API_URL = 'http://localhost:4000/api/generos';

// Retorna la lista de todos los géneros usando una petición de lectura.
export const getGeneros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crea un nuevo género enviando sus datos al servidor.
export const createGenero = async (generoData) => {
  const response = await axios.post(API_URL, generoData);
  return response.data;
};

// Actualiza un género existente buscando por su número de id.
export const updateGenero = async (id, generoData) => {
  const response = await axios.put(`${API_URL}/${id}`, generoData);
  return response.data;
};
