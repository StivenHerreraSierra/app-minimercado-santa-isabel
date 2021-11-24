import httpClient from '../httpClient';

const END_POINT = "api/tipos/documento";

const getTiposDocumento = () => httpClient.get(`${END_POINT}/all`);

export {
    getTiposDocumento
};