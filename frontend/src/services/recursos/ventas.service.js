import httpClient from '../httpClient';

const END_POINT = '/api/ventas';

const agregarVenta = (venta) => httpClient.post(`${END_POINT}/add`, venta);
const getVenta = (codigoVenta) => httpClient.get(`${END_POINT}/obtener/${codigoVenta}`);
const getCostoVenta = (codigoVenta) => httpClient.get(`${END_POINT}/costo/${codigoVenta}`);
const getVentas = () => httpClient.get(`${END_POINT}/listar`);
const getVentasFiltro = (filtro) => httpClient.get(`${END_POINT}/listar/${filtro}`);
const eliminarVenta = (venta) => httpClient.delete(`${END_POINT}/eliminar/${venta}`);
const editarVenta = (venta) => httpClient.put(`${END_POINT}/editar`, venta);

export {
    agregarVenta,
    getVentas,
    getVenta,
    getVentasFiltro,
    eliminarVenta,
    editarVenta,
    getCostoVenta
};