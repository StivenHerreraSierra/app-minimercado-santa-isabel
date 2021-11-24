const connection = require('../../config/database');

module.exports = class TipoDocumento {
    static obtenerTiposDocumento(req, res) {
        const sql = "SELECT DISTINCT idTipoDocumento, nombre FROM TipoDocumento";
        
        connection.query(sql, (error, results) => {
            if(error) throw error;

            res.status(200).json(results);
        });
    }
}