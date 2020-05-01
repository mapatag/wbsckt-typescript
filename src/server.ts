

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


    /*private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            console.log('Cliente conectado');

            // Mensajes
            //socket.mensaje( cliente, this.io );

            // Desconectar
            //socket.desconectar( cliente );         

        });

    } */


    start( callback: Function ) {

        this.httpServer.listen( this.port, callback );

    }

}

/*import * as express from "express";
import router from './router';
import * as bodyParser from 'body-parser'; // * as -> important! to prevent heroku deploy errors
//import cors from 'cors'; 
import * as socketIO from 'socket.io';  // * as --> prevent  has no default export. error in heroku logs
import * as http from 'http';

import log from "./log";

const app = express();

// BodyParser
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// CORS
//app.use( cors({ origin: true, credentials: true  }) );


// Rutas de servicios
app.use('/', router );

app.get("/", (req, res) => {
    res.json(JSON.stringify({ok: 1})).end();
});

app.listen(process.env.PORT || 5000, () => {
    log.info("app running");
});
*/
