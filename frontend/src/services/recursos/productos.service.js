import httpClient from '../httpClient';

const END_POINT = '/api/productos';

const getProductos = () => httpClient.get(`${END_POINT}/all`);
const agregarProductoVenta = (productoVenta) => httpClient.post(`${END_POINT}/add`, productoVenta);

export {
    getProductos,
    agregarProductoVenta
};