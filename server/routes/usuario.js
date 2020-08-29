const express = require('express');
const app = express();

//La siguiente linea permitira encriptar la contraseña del usuario:
const bcrypt = require('bcrypt');

const _ = require('underscore');

//La siguiente linea llama al modelo de datos del usuario
const Usuario = require('../models/usuario-model');


app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email google estado img rol').skip(desde).limit(limite).exec((err, usuarios) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.count({ estado: true }, (err, conteo) => {

            res.json({
                ok: true,
                usuarios,
                numeroTotaldeUsuarios: conteo
            });

        });

    });
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

//......./:id es el parámetro que recibirá el URL para actualizar o modificar los datos de algun usuario
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    //La siguiente linea adquiere el body de la respuesta del servidor y permite solamente la modificacion
    //de los parámetros que están dentro del arreglo:
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;