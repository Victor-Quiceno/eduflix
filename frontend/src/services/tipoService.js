// Servicio dedicado a manejar las peticiones del módulo tipo de media utilizando axios.
import axios from 'axios';

// Define la url de conexión hacia el recurso remoto en tu backend.
const API_URL = 'http://localhost:4000/api/tipos';

// Extrae el listado completo de tipos desde el servidor activo.
export const getTipos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Manda al servidor un bloque con la información del nuevo tipo creado.
export const createTipo = async (tipoData) => {
  const response = await axios.post(API_URL, tipoData);
  return response.data;
};

// Edita la información detallada de una clasificación específica apuntando a su número de id.
export const updateTipo = async (id, tipoData) => {
  const response = await axios.put(`${API_URL}/${id}`, tipoData);
  return response.data;
};
