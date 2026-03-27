// Servicio para comunicar el frontend con los endpoints del módulo de productoras mediante axios.
import axios from 'axios';

// Dirección estática hacia nuestra api de productoras.
const API_URL = '/api/productoras';

// Consulta el servidor remoto para traer el arreglo de productoras existentes.
export const getProductoras = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Envía la petición para guardar una productora completamente nueva.
export const createProductora = async (productoraData) => {
  const response = await axios.post(API_URL, productoraData);
  return response.data;
};

// Localiza una productora por su id y actualiza sus datos centrales.
export const updateProductora = async (id, productoraData) => {
  const response = await axios.put(`${API_URL}/${id}`, productoraData);
  return response.data;
};
