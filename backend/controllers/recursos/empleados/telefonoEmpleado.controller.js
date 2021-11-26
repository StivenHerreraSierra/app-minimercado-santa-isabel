const connection = require('../../../config/database.js');

module.exports = class TelefonoEmpleado {
    static addTelefono(req, res) {
        const sql = 'INSERT INTO TelefonoEmpleado (numero) VALUES ?';

        if(!req.body.numero) {
          res.status(400).json({ 'message': 'Número de telefono vacío' });
          return;
        }

        const telefono = {
            'numero': req.body.numero,
            Empleado_numeroDocumento: req.body.numeroDocumento
        };

        connection.query(sql, telefono, (err) => {
            if(err) res.status(400).json({ 'message': 'Número de telefono vacío' });
            else res.status(201).json({ "message": "Teléfono creado" });
        });
    }
};