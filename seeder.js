//importa o elimina datos a mongoDB

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//carga variables de entonro
dotenv.config({ path: './config/config.env'});

//carga modelo
const Organizador = require('./models/Organizador');

//conecta a la BBDD
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//lee el archivo JSON
const organizadores = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/organizadores.json`, 'utf-8')
);

//importa a la base de datos
const importData = async () => {
    try {
        await Organizador.create(organizadores);
        console.log('Importado correctamente');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//elimina de la base de datos
const deleteData = async () => {
    try {
        await Organizador.deleteMany();
        console.log('Eliminado correctamente');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}