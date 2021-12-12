require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

// const bodyParser = require('body-parser');

const PORT = 3050;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/empleados', require('./routes/recursos/empleados.router'));
app.use('/api/tipos/documento', require('./routes/tipos/tiposDocumento.router'));
app.use('/api/telefono/empleado', require('./routes/recursos/telefono.router'));
app.use('/api/contratos', require('./routes/recursos/contrato.router'));
app.use('/api/reportes', require('./routes/reportes.router'));
app.use('/api/clientes', require('./routes/recursos/cliente.router'));

//MySQL
const connection = require('./config/database');
connection.connect(error => {
    if(error) throw error;

    console.log('Database server running');
});


//Puerto en donde la API escucha.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
