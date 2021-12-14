const connection = require('../../../config/database.js');

module.exports = class TelefonoEmpleado {
    static addTelefono(req, res) {
        const sql = 'INSERT INTO TelefonoEmpleado (numero, Empleado_numeroDocumento, tipo) VALUES (?, ?, ?)';
        let mensajeError = "";

        if(!req.body.numero) {
          mensajeError = "El campo 'número' no puede ser vacío";
          res.status(400).json({ 'message': mensajeError });
          return;
        }

        const telefono = [
            req.body.numero,
            req.params.empleado,
            req.body.tipo
        ];

        console.log(req.body);

        connection.query(sql, telefono, (err) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(201).json({ "message": "Teléfono creado" });
        });
    }

    static getTelefonosEmpleado(req, res) {
        const sql = "SELECT numero FROM TelefonoEmpleado WHERE Empleado_numeroDocumento = ?";

        connection.query(sql, [req.params.empleado], (err, result) => {
            if(err) res.status(400).json({ 'message': err.message });
            else res.status(201).json(result);
        });
    }

    static editarTelefono(req, res) {

        const { numero, tipo, empleado } = req.body;

        if(!numero) {
            const add = "DELETE FROM TelefonoEmpleado WHERE tipo=? AND Empleado_numeroDocumento=?";
            connection.query(add, [tipo, empleado], (err, result) => {
                if(err) res.status(400).json({ 'message': err.message });
                else res.status(200).json({ 'message': "Teléfono eliminado " + result.affectedRows });
            });
        } else {
            const find = "SELECT numero FROM TelefonoEmpleado WHERE tipo=? AND Empleado_numeroDocumento=?";

            connection.query(find, [tipo, empleado], (err, results) => {
                if(err) res.status(400).json({ 'message': err.message });
                else {
                    if(results.length == 0) {
                        const insert = "INSERT INTO TelefonoEmpleado (numero, Empleado_numeroDocumento, tipo) VALUES (?, ?, ?)";

                        connection.query(insert, [numero, empleado, tipo], err => {
                            if(err) res.status(400).json({ 'message': err.message });
                            else res.status(201).json({ 'message': "Teléfono insertado" });
                        });
                    } else {
                        const update = "UPDATE TelefonoEmpleado SET numero=? WHERE tipo=? AND Empleado_numeroDocumento=?";

                        connection.query(update, [numero, tipo, empleado], err => {
                            if(err) res.status(400).json({ 'message': err.message });
                            else res.status(200).json({ 'message': "Teléfono actualizado" });
                        });
                    }
                }
            });
        }
    }
};