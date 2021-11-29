import httpClient from '../httpClient';

const END_POINT = '/api/contratos';

const agregarContrato = (contrato) => httpClient.post(`${END_POINT}/add`, contrato);
const getCargos = () => httpClient.get(`${END_POINT}/cargos`);
const getContratos = () => httpClient.get(`${END_POINT}/listar`)

export {
    agregarContrato,
    getCargos,
    getContratos
};