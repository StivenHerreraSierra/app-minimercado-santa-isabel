import httpClient from '../httpClient';

const END_POINT = '/api/empleados';

const getEmpleados = () => httpClient.get(`${END_POINT}/all`);
const agregarEmpleado = (empleado) => httpClient.post(`${END_POINT}/add`, empleado);
const removeEmpleado = (numeroDocumento) => httpClient.delete(`${END_POINT}/delete/${numeroDocumento}`);

export {
    getEmpleados,
    agregarEmpleado,
    removeEmpleado,
};