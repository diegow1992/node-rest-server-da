const mongoose = require('mongoose');

//La siguiente línea me permitira validar el email
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


//Defino los roles válidos del usuario para validarlos
let rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Usted debe ingresar su nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email debe ser ingresado obligatoriamente']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos //Valido los roles de los usuarios
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//Este bloque de código sirve para no retornar el password en la respuesta del rest-server POST
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


//Con esta línea hago que el email sea único para cada usuario:
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} ya está asignado a otro usuario' });


module.exports = mongoose.model('Usuario', usuarioSchema);