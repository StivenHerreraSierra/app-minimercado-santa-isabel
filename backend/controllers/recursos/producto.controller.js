const connection = require('../../config/database');

module.exports = class Producto {
    static getAll(req, res) {
        const sql = "SELECT codigo, nombre, precio, unidadesDisponibles, CategoriaProducto_codigo FROM Producto"

        connection.query(sql, (err, results) => {
            if(err) res.status(400).json({"message": err.message});
            else res.status(200).json(results);
        });
    }

    static agregarProductoVenta(req, res) {
        const eliminar = "DELETE FROM FacturaVenta_Producto WHERE FacturaVenta_codigo=?";

        const { codigoVenta, codigoProducto, precio, cantidad } = req.body;

        connection.query(eliminar, [codigoVenta], (err, result) => {
            if(err) res.status(400).json({"message": err.message});
            else {
                const insertar = "INSERT INTO FacturaVenta_Producto (FacturaVenta_codigo, Producto_codigo, precioProducto, cantidad) VALUES (?,?,?,?)"

                connection.query(insertar, [codigoVenta, codigoProducto, precio, cantidad], err => {
                    if(err) res.status(400).json({"message": err.message});
                    else res.status(200).json({"message": "Producto añadido"});
                })
            }
        });
    }

    static getProductosVenta(req, res) {
        const sql = "SELECT p.codigo, p.nombre, p.precio, p.unidadesDisponibles, p.CategoriaProducto_codigo "
                + "FROM Producto p "
                + "JOIN FacturaVenta_Producto fp "
                + "ON p.codigo = fp.Producto_codigo "
                + "WHERE fp.FacturaVenta_codigo=?"

        connection.query(sql, [req.params.codigoVenta], (err, results) => {
            if(err) res.status(400).json({"message": err.message});
            else res.status(200).json(results);
        })
    }
}