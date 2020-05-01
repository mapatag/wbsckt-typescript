
import router from './router';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import { SERVER_PORT } from './environment';
import  * as socketIO from 'socket.io';
import * as http from 'http';

//import * as socket from '../sockets/socket';



export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

      //  this.escucharSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }
}


const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors() );


// Rutas de servicios
server.app.use('/', router );




server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});
