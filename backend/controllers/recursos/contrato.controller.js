const connection = require('../../config/database');

module.exports = class ContratoController {
    static add(req, res) {
        const sql = "INSERT INTO Contrato (salario, fechaContratacion, fechaTerminacion, detalles, Cargo_codigo, Empleado_numeroDocumento, EstadoContrato_idEstadoContrato) VALUES (?, ?, ?, ?, ?, ?, ?)";

        if(!req.body.salario || !req.body.fechaContratacion || !req.body.fechaTerminacion
            || !req.body.cargoId || !req.body.empleado) {
            res.status(400).json({ 'message': 'Hay campos vacíos' });
            return;
        }

        const contrato = [
            req.body.salario,
            req.body.fechaContratacion,
            req.body.fechaTerminacion,
            req.body.detalles,
            req.body.cargoId,
            req.body.empleado,
            req.body.estadoContrato
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

    static getContrato(req, res) {
        const sql = "SELECT codigo, Empleado_numeroDocumento empleado, Cargo_codigo codigoCargo, salario, fechaContratacion, fechaTerminacion, EstadoContrato_idEstadoContrato estado, detalles "
                    + "FROM Contrato "
                    + "WHERE codigo=?";

        connection.query(sql, [req.params.codigo], (err, result) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(result);
        })
    }

    static getContratos(req, res) {
        const sql = "SELECT ct.codigo, ct.Empleado_numeroDocumento empleado, cg.nombre cargo, ct.salario, ct.fechaContratacion, ct.fechaTerminacion, e.nombre estado "
                    + "FROM Contrato ct "
                    + "JOIN Cargo cg "
                    + "ON ct.Cargo_codigo = cg.codigo "
                    + "JOIN EstadoContrato e "
                    + "ON ct.EstadoContrato_idEstadoContrato = e.idEstadoContrato";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static getContratosFiltro(req, res) {
        const sql = "SELECT DISTINCT ct.codigo, ct.Empleado_numeroDocumento empleado, cg.nombre cargo, ct.salario, ct.fechaContratacion, ct.fechaTerminacion, e.nombre estado "
                    + "FROM Contrato ct "
                    + "JOIN Cargo cg "
                    + "ON ct.Cargo_codigo = cg.codigo "
                    + "JOIN EstadoContrato e "
                    + "ON ct.EstadoContrato_idEstadoContrato = e.idEstadoContrato "
                    + "WHERE ct.codigo LIKE ? OR ct.Empleado_numeroDocumento LIKE ? OR cg.nombre LIKE ? OR ct.salario LIKE ? OR ct.fechaContratacion LIKE ? OR ct.fechaTerminacion LIKE ? OR e.nombre LIKE ?";

        const filtro = req.params.filtro + "%";

        connection.query(sql, [filtro, filtro, filtro, filtro, filtro, filtro, filtro], (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static getEstados(req, res) {
        const sql = "SELECT idEstadoContrato codigo, nombre FROM EstadoContrato";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static eliminarContrato(req, res) {
        const sql = "DELETE FROM Contrato WHERE codigo=?";
        const { contrato } = req.params;

        connection.query(sql, [contrato], (err) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json({ message: 'Contrato ' + contrato + " eliminado"});
        })
    }

    static editar(req, res) {
        const sql = "UPDATE Contrato "
                    + "SET salario=?, fechaContratacion=?, fechaTerminacion=?, detalles=?, Cargo_codigo=?, Empleado_numeroDocumento=?, EstadoContrato_idEstadoContrato=? "
                    + "WHERE codigo=?";

        const {
          salario,
          fechaContratacion,
          fechaTerminacion,
          detalles,
          cargoId,
          empleado,
          estadoContrato,
          codigo
        } = req.body;

        connection.query(sql, [salario, fechaContratacion,  fechaTerminacion, detalles, cargoId, empleado, estadoContrato, codigo], (err, result) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json({ message: result.affectedRows + " contrato(s) editado(s)."});
        })
    }
}