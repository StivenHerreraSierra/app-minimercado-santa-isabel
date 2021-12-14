import httpClient from '../httpClient';

const END_POINT = '/api/clientes';

const getClientes = () => httpClient.get(`${END_POINT}/all`);
const getClientesFiltrado = (filtro) => httpClient.get(`${END_POINT}/all/${filtro}`);
const getCliente = (numeroDocumento) => httpClient.get(`${END_POINT}/obtener/${numeroDocumento}`);
const agregarCliente = (cliente) => httpClient.post(`${END_POINT}/add`, cliente);
const editarCliente = (cliente) => httpClient.put(`${END_POINT}/editar`, cliente);
const removeCliente = (numeroDocumento) => httpClient.delete(`${END_POINT}/delete/${numeroDocumento}`);

export {
    getClientes,
    getClientesFiltrado,
    getCliente,
    agregarCliente,
    editarCliente,
    removeCliente,
};