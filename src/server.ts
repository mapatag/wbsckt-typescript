
import router from './router';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { SERVER_PORT } from './environment';
import  * as socketIO from 'socket.io';
import * as http from 'http';
import * as cors from 'cors';

import * as socket from './socket';

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

        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => { 
            console.log('Cliente conectado');
            // Conectar cliente -> nuevo para basico-v3
            socket.conectarCliente( cliente, this.io);
            // Configurar usuario -> nuevo para basico-v3
            socket.configurarUsuario( cliente, this.io );
            // Obtener usuarios activos -> nuevo para basico-v4
            socket.obtenerUsuarios( cliente, this.io );
            // Mensajes
            socket.mensaje( cliente, this.io );
            // Desconectar
            socket.desconectar( cliente, this.io );         
        });
    } 

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback );
    }
}

const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicios
server.app.use('/', router );

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});
