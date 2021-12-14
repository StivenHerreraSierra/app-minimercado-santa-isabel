import httpClient from '../httpClient';

const END_POINT = '/api/contratos';

const agregarContrato = (contrato) => httpClient.post(`${END_POINT}/add`, contrato);
const getCargos = () => httpClient.get(`${END_POINT}/cargos`);
const getContrato = (codigoContrato) => httpClient.get(`${END_POINT}/obtener/${codigoContrato}`);
const getContratos = () => httpClient.get(`${END_POINT}/listar`);
const getContratosFiltro = (filtro) => httpClient.get(`${END_POINT}/listar/${filtro}`);
const eliminarContrato = (contrato) => httpClient.delete(`${END_POINT}/eliminar/${contrato}`);
const getEstados = () => httpClient.get(`${END_POINT}/estados`);
const editarContrato = (contrato) => httpClient.put(`${END_POINT}/editar`, contrato);

export {
    agregarContrato,
    getCargos,
    getContrato,
    getContratos,
    getContratosFiltro,
    eliminarContrato,
    getEstados,
    editarContrato
};