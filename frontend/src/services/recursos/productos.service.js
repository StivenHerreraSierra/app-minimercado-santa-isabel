import httpClient from '../httpClient';

const END_POINT = '/api/productos';

const getProductos = () => httpClient.get(`${END_POINT}/all`);
const getProductosComprados = (codigoVenta) => httpClient.get(`${END_POINT}/all/${codigoVenta}`);
const agregarProductoVenta = (productoVenta) => httpClient.post(`${END_POINT}/add`, productoVenta);

export {
    getProductos,
    getProductosComprados,
    agregarProductoVenta
};