const connection = require('../config/database');

module.exports = class ReportesController {
    static nominaPorCargo(req, res) {
        const sql = "SELECT cg.nombre, SUM(salario) nomina "
            + "FROM Contrato ct "
            + "JOIN Cargo cg ON ct.Cargo_codigo = cg.codigo "
            + "JOIN EstadoContrato e ON ct.EstadoContrato_idEstadoContrato = e.idEstadoContrato "
            + "WHERE e.nombre = 'Aprobado' "
            + "GROUP BY cg.nombre";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }
}