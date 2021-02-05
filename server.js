const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgna');

//route files
const empresas = require('./routes/empresas');

/*carga las variables de configuración*/
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/empresas', bootcamps);

const PORT = process.env.PORT;

app.listen(
    PORT, 
    console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`));