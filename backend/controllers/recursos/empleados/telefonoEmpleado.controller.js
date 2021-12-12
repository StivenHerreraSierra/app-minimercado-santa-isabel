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
};