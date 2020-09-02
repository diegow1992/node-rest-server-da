require('./config/config'); //Puertos en el hosting

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));


app.use(require('./routes/index')); //Se llama a todas las rutas de la aplicación



//Conexion a la base de datos

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE...');
});




app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
});