const express = require('express');
const dotenv = require('dotenv');

/*carga las variables de configuración*/
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`));