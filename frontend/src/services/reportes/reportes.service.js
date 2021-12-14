import httpClient from '../httpClient';

const END_POINT = '/api/reportes';

const getNominaPorCargo = () => httpClient.get(`${END_POINT}/nomina-cargo`);
const getCantidadPedidosEstado = () => httpClient.get(`${END_POINT}/pedidos-estado`);
const getTotalCompradoPorClientes = () => httpClient.get(`${END_POINT}/compras-cliente`);
const getVentasPorMes = () => httpClient.get(`${END_POINT}/ventas-mes`);
const getMediosFrecuentesRegistroPedidos = () => httpClient.get(`${END_POINT}/medios-registro`);
const getGastosPorMes = () => httpClient.get(`${END_POINT}/gastos-mes`);
const getProductosPorCategoria = () => httpClient.get(`${END_POINT}/productos-categoria`);

export {
    getNominaPorCargo,
    getCantidadPedidosEstado,
    getTotalCompradoPorClientes,
    getVentasPorMes,
    getMediosFrecuentesRegistroPedidos,
    getGastosPorMes,
    getProductosPorCategoria
};