const connection = require('../../config/database');

module.exports = class Cliente {
    static getAll(req, res) {
        const sql = "SELECT numeroDocumento, nombreCompleto, telefono, direccionResidencia, TipoDocumento_idTipoDocumento FROM Cliente";

        connection.query(sql, (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }

    static getAllFiltered(req, res) {
        const sql = "SELECT DISTINCT numeroDocumento, nombreCompleto, telefono, direccionResidencia, TipoDocumento_idTipoDocumento "
                + "FROM Cliente "
                + "WHERE numeroDocumento LIKE ? OR nombreCompleto LIKE ? OR direccionResidencia LIKE ? OR telefono LIKE ?";

        const filtro = req.params.filtro + "%";

        connection.query(sql, [filtro, filtro, filtro, filtro], (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }

    static get(req, res) {
        const sql = "SELECT numeroDocumento, nombreCompleto, telefono, direccionResidencia, TipoDocumento_idTipoDocumento tipoDocumento FROM Cliente WHERE numeroDocumento = ?";

        connection.query(sql, [req.params.numeroDocumento], (error, result) => {
            if(error) res.status(400).json({ "message": 'No se encontró un cliente con ese número de documento' });

            res.status(200).json(result);
        });
    }

    static add(req, res) {
        const sql = "INSERT INTO Cliente (numeroDocumento, nombreCompleto, telefono, direccionResidencia, TipoDocumento_idTipoDocumento) VALUES (?, ?, ?, ?, ?)";
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
            console.log("Error en clientes:", mensajeError);
            return;
        }

        const cliente = [
            req.body.numeroDocumento,
            req.body.nombreCompleto,
            req.body.telefono,
            req.body.direccionResidencia,
            req.body.tipoDocumento
        ];

        connection.query(sql, cliente, error => {
            if(error) res.status(400).json({"message": err.message});
            else res.status(201).json({ "message": "Cliente creado" });
        });
    }

    static update(req, res) {
        const sql = `UPDATE Cliente SET nombreCompleto=?, direccionResidencia=?, telefono=? WHERE numeroDocumento=?`;
        const { nombreCompleto, direccionResidencia, telefono, numeroDocumento } = req.body;

        connection.query(sql, [nombreCompleto, direccionResidencia, telefono, numeroDocumento], error => {
            if(error) throw error;

            res.status(201).json({ "message": "Cliente actualizado" });
        })
    }

    static delete(req, res) {
        const numeroDocumento = req.params.numeroDocumento.trim();
        const sql = `DELETE FROM Cliente WHERE numeroDocumento=${numeroDocumento}`

        if(numeroDocumento.length > 0) {
            connection.query(sql, (error, result) => {
                if(error) throw error;

                if(result.affectedRows == 0) res.status(400).send({ error: 'No se encontró un cliente con ese número de documento' });
                else res.status(200).json({ "message": "Cliente eliminado" });
            });
        } else {
            res.status(400).send({ error: "El número de documento no puede estar vacío" });
        }
    }
}