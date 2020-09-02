const jwt = require('jsonwebtoken');


//=========================================
//            Verificar Token
//=========================================

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token inválido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

    //res.json({
    //    ok: true,
    //    token: token
    //});
};

//=========================================
//           Verificar AdminRole
//=========================================
let verificarAdmin_Rol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.rol === 'ADMIN_ROL') {

        next();

    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es un administrador'
            }
        });
    }
};


//Verifica Token para imagen
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token inválido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });


}
module.exports = {
    verificarToken,
    verificarAdmin_Rol,
    verificaTokenImg
}