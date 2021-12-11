import httpClient from '../httpClient';

const END_POINT = '/api/telefono/empleado';

const agregarNumero = (empleado, numero) => httpClient.post(`${END_POINT}/add/${empleado}`, numero);
const listarTelefonos = (empleado) => httpClient.get(`${END_POINT}/listar/${empleado}`);

export {
    agregarNumero,
    listarTelefonos
};