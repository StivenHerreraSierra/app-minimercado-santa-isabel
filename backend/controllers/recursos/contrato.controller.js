const connection = require('../../config/database');

module.exports = class ContratoController {
    static add(req, res) {
        const sql = "INSERT INTO Contrato (salario, fechaContratacion, fechaTerminacion, detalles, Cargo_codigo, Empleado_numeroDocumento) VALUES (?, ?, ?, ?, ?, ?)";

        if(!req.body.salario || !req.body.fechaContratacion || !req.body.fechaTerminacion
            || !req.body.cargoId || !req.body.empleadoNumeroDocumento) {
            res.status(400).json({ 'message': 'Hay campos vacíos' });
            return;
        }

        const contrato = [
            req.body.salario,
            req.body.fechaContratacion,
            req.body.fechaTerminacion,
            req.body.detalles,
            req.body.cargoId,
            req.body.empleadoNumeroDocumento
        ];

        connection.query(sql, contrato, err => {
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

    static getContratos(req, res) {
        const sql = "SELECT codigo, Empleado_numeroDocumento, Cargo_codigo, salario, fechaContratacion, fechaTerminacion FROM Contrato";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static eliminarContrato(req, res) {
        const sql = "DELETE FROM Contrato WHERE codigo=? AND Empleado_numeroDocumento=?";
        const { contrato, empleado } = req.params;

        connection.query(sql, [contrato, empleado], (err) => {
            if(err) throw err;
            else res.json({ message: 'Contrato ' + contrato + " eliminado"});
        })
    }
}