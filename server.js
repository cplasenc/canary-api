const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

/*carga las variables de configuración*/
dotenv.config({ path: './config/config.env' });

/*conecta a la base de datos */
connectDB();

//route files
const organizadores = require('./routes/organizadores');
const actividades = require('./routes/actividades');
const auth = require('./routes/auth');
const usuarios = require('./routes/usuarios');
const opiniones = require('./routes/opiniones');

const app = express();

//Body parser
app.use(express.json());

//cookie-parse3r
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Sube imagen
app.use(fileUpload());

//Sanitize data
app.use(mongoSanitize());

//headers de seguridad
app.use(helmet());

//evita cross-site scripting
app.use(xss());

//CORS
app.use(cors());

//limite de peiticones a la api
const limite = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutos
  max: 100,
});

app.use(limite);

//prevenir contaminacion de http
app.use(hpp());

//carpeta de imagenes
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/organizadores', organizadores);
app.use('/api/v1/actividades', actividades);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', usuarios);
app.use('/api/v1/opiniones', opiniones);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`
  )
);

/* Handle unhandled promise rejections
Evita que se conecte a la aplicacion si hay un error de conexion a la bbdd */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
