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
        const sql = "INSERT INTO FacturaVenta_Producto (FacturaVenta_codigo, Producto_codigo, precioProducto, cantidad) VALUES (?,?,?,?)"

        const { codigoVenta, codigoProducto, precio, cantidad } = req.body;

        connection.query(sql, [codigoVenta, codigoProducto, precio, cantidad], err => {
            if(err) res.status(400).json({"message": err.message});
            else res.status(200).json({"message": "Producto añadido"});
        })
    }
}