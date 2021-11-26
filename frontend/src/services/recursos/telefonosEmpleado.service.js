import httpClient from '../httpClient';

const END_POINT = '/api/telefono/empleado';

const agregarNumero = (numero) => httpClient.post(`${END_POINT}/add`, numero);

export {
    agregarNumero
};