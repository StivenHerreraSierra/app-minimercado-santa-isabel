import httpClient from '../httpClient';

const END_POINT = '/api/reportes';

const getNominaPorCargo = () => httpClient.get(`${END_POINT}/nomina-cargo`);

export {
    getNominaPorCargo
};