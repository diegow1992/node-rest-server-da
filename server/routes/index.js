const express = require('express');
const app = express();

app.use(require('./usuario')); //Se llama al código de las rutas del usuario
app.use(require('./login')); //Se llama al código de las rutas de login


module.exports = app;