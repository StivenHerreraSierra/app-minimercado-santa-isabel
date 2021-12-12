const connection = require('../../../config/database');
const telefonoController = require('./telefonoEmpleado.controller');

module.exports = class Empleado {
    static getAll(req, res) {
        const sql = "SELECT numeroDocumento, nombreCompleto, direccionResidencia, TipoDocumento_idTipoDocumento FROM Empleado";

        connection.query(sql, (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }

    static getAllFiltered(req, res) {
        const sql = "SELECT numeroDocumento, nombreCompleto, direccionResidencia, TipoDocumento_idTipoDocumento "
                + "FROM Empleado e "
                + "JOIN TelefonoEmpleado t "
                + "ON e.numeroDocumento = t.Empleado_numeroDocumento "
                + "WHERE e.numeroDocumento LIKE ? OR e.nombreCompleto LIKE ? OR e.direccionResidencia LIKE ? "
                + "OR t.numero LIKE ?";

        const filtro = req.params.filtro + "%";

        connection.query(sql, [filtro, filtro, filtro, filtro], (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }

    static get(req, res) {
        const sql = "SELECT numeroDocumento, nombreCompleto, direccionResidencia, TipoDocumento_idTipoDocumento tipoDocumento FROM Empleado WHERE numeroDocumento = ?";

        connection.query(sql, [req.params.numeroDocumento], (error, result) => {
            if(error) res.status(400).send({ error: 'No se encontró un empleado con ese número de documento' });

            res.status(200).json(result);
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
        const sql = `UPDATE Empleado SET nombreCompleto=?, direccionResidencia=? WHERE numeroDocumento=?`;
        const { nombreCompleto, direccionResidencia, numeroDocumento } = req.body;

        connection.query(sql, [nombreCompleto, direccionResidencia, numeroDocumento], error => {
            if(error) throw error;

            res.status(201).json({ "message": "Empleado actualizado" });
        })
    }

    static delete(req, res) {
        const numeroDocumento = req.params.numeroDocumento.trim();
        const sql = `DELETE FROM Empleado WHERE numeroDocumento=${numeroDocumento}`

        if(numeroDocumento.length > 0) {
            connection.query(sql, (error, result) => {
                if(error) throw error;

                if(result.affectedRows == 0) res.status(400).send({ error: 'No se encontró un empleado con ese número de documento' });
                else res.status(200).json({ "message": "Empleado eliminado" });
            });
        } else {
            res.status(400).send({ error: "El número de documento no puede estar vacío" });
        }
    }
}