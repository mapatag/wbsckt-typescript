import Server from './src/server';
import router from './src/router';
import * as bodyParser from 'body-parser';
//import cors from 'cors';



const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
//server.app.use( cors() );


// Rutas de servicios
server.app.use('/', router );




server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});
