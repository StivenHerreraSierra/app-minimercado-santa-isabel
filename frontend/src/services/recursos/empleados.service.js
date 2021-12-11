import httpClient from '../httpClient';

const END_POINT = '/api/empleados';

const getEmpleados = () => httpClient.get(`${END_POINT}/all`);
const getEmpleado = (numeroDocumento) => httpClient.get(`${END_POINT}/obtener/${numeroDocumento}`);
const agregarEmpleado = (empleado) => httpClient.post(`${END_POINT}/add`, empleado);
const removeEmpleado = (numeroDocumento) => httpClient.delete(`${END_POINT}/delete/${numeroDocumento}`);

export {
    getEmpleados,
    getEmpleado,
    agregarEmpleado,
    removeEmpleado,
};