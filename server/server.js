require('./config/config'); //Puertos en el hosting

const mongoose = require('mongoose');
const express = require('express');
const app = express();

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);
//mongoose.set('useCreateIndex', true);


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(require('./routes/usuario')); //Se llama al código de las rutas del usuario



//Conexion a la base de datos

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE...');
});
//mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {
//    if (err) throw err;
//    console.log('Base de datos ONLINE...');
//});



app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
});