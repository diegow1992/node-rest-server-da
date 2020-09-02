const express = require('express');
const app = express();

app.use(require('./usuario')); //Se llama al código de las rutas del usuario
app.use(require('./login')); //Se llama al código de las rutas de login
app.use(require('./categoria-routes')); //Se llama al código de  de las categorias
app.use(require('./producto-routes'));
app.use(require('./upload'));
app.use(require('./imagenes-routes'));
module.exports = app;