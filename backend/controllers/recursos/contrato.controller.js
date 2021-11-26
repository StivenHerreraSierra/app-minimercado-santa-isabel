const connection = require('../../config/database');

module.exports = class ContratoController {
    static add(req, res) {
        const sql = "INSERT INTO Contrato \
        (salario, fechaContratacion, fechaTerminacion, detalle, Cargo_codigo, Empleado_numeroDocument \
        VALUES ?";

        if(!req.body.salario || !req.body.fechaContrato || !req.body.fechaTerminacion
            || !req.body.detalle || !req.body.cargoId || !req.body.empleadoNumeroDocumento) {
            res.status(400).json({ 'message': 'Hay campos vacíos' });
            return;
        }

        const contrato = {
            salario: req.body.salario,
            fechaContratacion: req.body.fechaContrato,
            fechaTerminacion: req.body.fechaTerminacion,
            detalle: req.body.detalle,
            cargo: req.body.cargoId,
            empleadoNumeroDocumento: req.body.empleadoNumeroDocumento
        };

        connection.query(sql, contrato, err => {
            console.log('Telefonos');

            if(err) res.status(400).json({ 'message': err.message });
            else res.status(201).json({ 'message': 'Contrato creado' });
        })
    }

    static getCargos(req, res) {
        const sql = "SELECT codigo, nombre FROM Cargo";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }
}