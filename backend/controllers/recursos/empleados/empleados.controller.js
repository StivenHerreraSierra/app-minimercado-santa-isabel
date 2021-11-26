const connection = require('../../../config/database');
const telefonoController = require('./telefonoEmpleado.controller');

module.exports = class Empleado {
    static getAll(req, res) {
        const sql = "SELECT * FROM Empleado";

        connection.query(sql, (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }

    static add(req, res) {
        const sql = "INSERT INTO Empleado (numeroDocumento, nombreCompleto, direccionResidencia, TipoDocumento_idTipoDocumento) VALUES (?, ?, ?, ?)";
        let mensajeError = "";

        if(!req.body.numeroDocumento) {
            mensajeError = "El campo 'Número de documento' no puede ser vacío";
        } else if(!req.body.nombreCompleto){
            mensajeError = "El campo 'Nombre completo' no puede ser vacío";
        } else if(!req.body.direccionResidencia) {
            mensajeError = "El campo 'Dirección' no puede ser vacío";
        }
        if(mensajeError != "") {
            res.status(400).json({ "message": mensajeError });
            console.log("Error en empleados:", mensajeError);
            return;
        }

        const empleado = [
            req.body.numeroDocumento,
            req.body.nombreCompleto,
            req.body.direccionResidencia,
            req.body.tipoDocumento
        ];

        connection.query(sql, empleado, error => {
            if(error) throw error;

            res.status(201).json({ "message": "Empleado creado" });
        });
    }

    static update(req, res) {
        const cedula = req.params.cedula;
        const { nombre } = req.body;
        const sql = `UPDATE Empleado SET nombre='${nombre}' WHERE cedula=${cedula}`;

        connection.query(sql, error => {
            if(error) throw error;

            res.status(201).json({ "message": "Empleado actualizado" });
        })
    }

    static delete(req, res) {
        const cedula = req.params.cedula.trim();
        const sql = `DELETE FROM Empleado WHERE cedula=${cedula}`

        if(cedula.length > 0) {
            connection.query(sql, (error, result) => {
                if(error) throw error;

                if(result.affectedRows == 0) res.status(400).send({ error: 'No se encontró un empleado con esa cédula' });
                else res.status(200).json({ "message": "Empleado eliminado" });
            });
        } else {
            res.status(400).send({ error: "La cédula no puede ser vacía" });
        }
    }
}