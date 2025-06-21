import axios from 'axios';

const API_URL = 'http://localhost:8080/producto';

export default {
  listar() {
    return axios.get(`${API_URL}/lista`);
  },
  crear(producto) {
    return axios.post(`${API_URL}/create`, producto);
  },
  eliminar(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  },
  actualizar(id, producto) {
    return axios.put(`${API_URL}/update/${id}`, producto);
  }
};
