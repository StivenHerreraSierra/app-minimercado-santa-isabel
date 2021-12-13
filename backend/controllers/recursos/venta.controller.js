const connection = require('../../config/database');

module.exports = class VentaController {
    static add(req, res) {
        const sql = "INSERT INTO FacturaVenta (fechaVenta, totalImpuestos, totalDescuentos, Empleado_numeroDocumento, Cliente_numeroDocumento) VALUES (?, ?, ?, ?, ?)";

        if(!req.body.cliente || !req.body.empleado) {
            res.status(400).json({ 'message': 'Hay campos vacíos' });
            return;
        }

        const {
            fechaVenta, totalImpuestos, totalDescuentos, empleado, cliente
        } = req.body;

        connection.query(sql, [fechaVenta, totalImpuestos, totalDescuentos, empleado, cliente], (err, result) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(201).json({ 'message': 'Factura de venta creada', result });
        })
    }

    static getVenta(req, res) {
        const sql = "SELECT v.codigo, v.fechaVenta, v.totalImpuestos, v.totalDescuentos, v.Empleado_numeroDocumento empleado, v.Cliente_numeroDocumento cliente, SUM(fp.precioProducto * fp.cantidad) costo "
                    + "FROM FacturaVenta v "
                    + "LEFT JOIN FacturaVenta_Producto fp "
                    + "ON v.codigo = fp.FacturaVenta_codigo "
                    + "WHERE codigo=? "
                    + "GROUP BY fp.FacturaVenta_codigo";

        connection.query(sql, [req.params.codigo], (err, result) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(result);
        })
    }

    static getVentas(req, res) {
        const sql = "SELECT v.codigo, v.fechaVenta, v.totalImpuestos, v.totalDescuentos, e.nombreCompleto empleado, c.nombreCompleto cliente, SUM(fp.precioProducto * fp.cantidad) costo "
                + "FROM FacturaVenta v "
                + "LEFT JOIN FacturaVenta_Producto fp "
                + "ON v.codigo = fp.FacturaVenta_codigo "
                + "JOIN Empleado e "
                + "ON v.Empleado_numeroDocumento = e.numeroDocumento "
                + "JOIN Cliente c "
                + "ON v.Cliente_numeroDocumento = c.numeroDocumento "
                + "GROUP BY v.codigo"

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static getCostoVenta(req, res) {
        const sql = "SELECT SUM(precioProducto * cantidad) costo FROM FacturaVenta_Producto WHERE FacturaVenta_codigo=? GROUP BY FacturaVenta_codigo";

        connection.query(sql, [req.params.codigo], (err, result) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(result);
        })
    }

    static getVentasFiltro(req, res) {
        const sql = "SELECT v.codigo, v.fechaVenta, v.totalImpuestos, v.totalDescuentos, e.nombreCompleto empleado, c.nombreCompleto cliente, SUM(fp.precioProducto * fp.cantidad) costo "
                    + "FROM FacturaVenta v "
                    + "LEFT JOIN FacturaVenta_Producto fp "
                    + "ON v.codigo = fp.FacturaVenta_codigo "
                    + "JOIN Empleado e "
                    + "ON v.Empleado_numeroDocumento = e.numeroDocumento "
                    + "JOIN Cliente c "
                    + "ON v.Cliente_numeroDocumento = c.numeroDocumento "
                    + "WHERE v.codigo LIKE ? OR e.nombreCompleto LIKE ? OR c.nombreCompleto LIKE ? OR v.fechaVenta LIKE ?"
                    + "GROUP BY v.codigo";

        const filtro = req.params.filtro + "%";

        connection.query(sql, [filtro, filtro, filtro, filtro], (err, results) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(200).json(results);
        })
    }

    static eliminarVenta(req, res) {
        const sql = "DELETE FROM FacturaVenta WHERE codigo=?";
        const { venta } = req.params;

        connection.query(sql, [venta], (err) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json({ message: 'Venta ' + venta + " eliminada"});
        })
    }

    static editar(req, res) {
        const sql = "UPDATE FacturaVenta "
                    + "SET fechaVenta=?, totalImpuestos=?, totalDescuentos=?, Empleado_numeroDocumento=?, Cliente_numeroDocumento=? "
                    + "WHERE codigo=? ";

        const {
          fechaVenta,
          totalImpuestos,
          totalDescuentos,
          empleado,
          cliente,
          codigo
        } = req.body;

        connection.query(sql, [fechaVenta, totalImpuestos,  totalDescuentos, empleado, cliente, codigo], (err, result) => {
            if(err) res.status(400).json({ "message": err.message });
            else res.status(200).json({ message: result.affectedRows + " factura(s) editada(s)."});
        })
    }
}