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

    static cantidadPedidosEstado(req, res) {
        const sql = "SELECT es.nombre, COUNT(e.codigo) Total "
                + "FROM Encargo e "
                + "JOIN EstadoEncargo es "
                + "ON e.EstadoEncargo_codigo = es.codigo "
                + "GROUP BY es.nombre"

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }

    static totalCompradoPorClientes(req, res) {
        const sql = "SELECT c.nombreCompleto, SUM(fp.precioProducto * fp.cantidad) AS totalComprado "
                + "FROM FacturaVenta fv "
                + "JOIN Cliente c "
                + "ON fv.Cliente_numeroDocumento = c.numeroDocumento "
                + "JOIN FacturaVenta_Producto fp "
                + "ON fv.codigo = fp.FacturaVenta_codigo "
                + "GROUP BY fv.Cliente_numeroDocumento "
                + "HAVING SUM(fp.precioProducto * fp.cantidad) > 15000";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }

    static ventasPorMes(req, res) {
        const sql = "SELECT MONTHNAME(fechaVenta) mes, SUM(fp.precioProducto * fp.cantidad) total "
                + "FROM FacturaVenta fv "
                + "JOIN FacturaVenta_Producto fp "
                + "ON fv.codigo = fp.FacturaVenta_codigo "
                + "GROUP BY MONTHNAME(fechaVenta)"

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });  
    }

    static mediosFrecuentesRegistroPedidos(req, res) {
        const sql = "SELECT medioDeRegistro, COUNT(medioDeRegistro) frecuencia "
                + "FROM Pedido "
                + "GROUP BY medioDeRegistro";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }

    static gastosPorMes(req, res) {
        const sql = "SELECT MONTHNAME(fechaHora) mes, SUM(valor) gasto "
                + "FROM Gasto "
                + "GROUP BY MONTHNAME(fechaHora)"

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }

    static productosPorCategoria(req, res) {
        const sql = "SELECT c.nombre, COUNT(p.codigo) total "   
                + "FROM Producto p "
                + "JOIN CategoriaProducto c "
                + "ON p.CategoriaProducto_codigo = c.codigo "
                + "GROUP BY c.nombre "
                + "ORDER BY COUNT(p.codigo)";

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json(results);
        });
    }
}