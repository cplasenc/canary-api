const express = require('express');
const dotenv = require('dotenv');

//route files
const empresas = require('./routes/empresas');

/*carga las variables de configuración*/
dotenv.config({ path: './config/config.env' });

const app = express();

//Mount routers
app.use('/api/v1/empresas', bootcamps);

const PORT = process.env.PORT;

app.listen(
    PORT, 
    console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`));