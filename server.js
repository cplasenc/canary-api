const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgna');
const connectDB = require('./config/db');

/*carga las variables de configuración*/
dotenv.config({ path: './config/config.env' });

/*connecta a la base de datos */
connectDB();

//route files
const empresas = require('./routes/empresas');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/empresas', bootcamps);

const PORT = process.env.PORT;

const server = app.listen(
    PORT, 
    console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`)
);

/* Handle unhandled promise rejections
Evita que se conecte a la aplicacion si hay un error de conexion a la bbdd */
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});