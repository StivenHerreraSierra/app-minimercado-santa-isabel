import httpClient from '../httpClient';

const END_POINT = '/api/empleados';

const getEmpleados = () => httpClient.get(`${END_POINT}/all`);

export {
    getEmpleados,
};