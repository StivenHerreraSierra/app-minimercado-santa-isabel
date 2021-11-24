import httpClient from '../httpClient';

const END_POINT = '/api/empleados';

const getEmpleados = () => httpClient.get(`${END_POINT}/all`);
const agregarEmpleado = (empleado) => httpClient.post(`${END_POINT}/add`, empleado);
const removeEmpleado = (cedula) => httpClient.delete(`${END_POINT}/delete/${cedula}`);

export {
    getEmpleados,
    agregarEmpleado,
    removeEmpleado,
};