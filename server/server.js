const express = require('express');
const app = express();


const bodyParser = require('body-parser');
require('./config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/usuario', (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'Es obligatorio ingresar el nombre'
        });
    } else {
        res.json({
            persona: body
        });
    }
});

//......./:id es el parámetro que recibirá el URL para actualizar o modificar los datos de algun usuario
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT)
});