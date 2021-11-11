import httpClient from '../httpClient';

const END_POINT = '/api/empleados';

const getEmpleados = () => httpClient.get(`${END_POINT}/all`);
const removeEmpleado = (cedula) => httpClient.delete(`${END_POINT}/delete/${cedula}`);

export {
    getEmpleados,
    removeEmpleado,
};