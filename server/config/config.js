//=========================================
//               PUERTO
//=========================================

process.env.PORT = process.env.PORT || 3000;


//=========================================
//               Entorno
//=========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=========================================
//          Vencimiento del token
//=========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '30d'; //Duracion de un mes




//=========================================
//          SEED de autenticación
//=========================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//=========================================
//               Base de datos
//=========================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//=========================================
//             Google ID client
//=========================================
//process.env.CLIENT_ID = process.env.CLIENT_ID || '620056254796-tg1pkshvsh183r7lletsf2sd3uvtcsqd.apps.googleusercontent.com';