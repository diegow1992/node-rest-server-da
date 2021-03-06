const express = require('express');
const app = express();

const { verificarToken } = require('../middlewares/autenticacion');

let Producto = require('../models/producto-model');


//Obtener todos los productos
app.get('/productos', verificarToken, (req, res) => {
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true }).skip(desde).limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });
});


//Obtener un producto por id
app.get('/productos/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id).populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});


//Buscar productos
app.get('/productos/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});



//Crear nuevo producto
app.post('/productos', verificarToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });


    });

});



//Actualizar producto
app.put('/productos/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el producto en mención'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoActualizado) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoActualizado
            });

        });

    });

});


//Borrar un producto
app.delete('/productos/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoStandBy) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoStandBy,
                mensaje: 'Producto Borrado'
            });

        });

    });

});





module.exports = app;