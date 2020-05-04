import { Socket } from 'socket.io';
import * as socketIO from 'socket.io';
import { UsuariosLista } from './usuarios-lista'; // -> nuevo para basico-v3
import { Usuario } from './usuario';              // -> nuevo para basico-v3 

export const usuariosConectados = new UsuariosLista(); // -> nuevo para basico-v3

export const conectarCliente = ( cliente: Socket ) => { // -> nuevo para basico-v3
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => {
        console.log('Mensaje recibido', payload );
        io.emit('mensaje-nuevo', payload );
    });
}

// Configurar usuario -> nuevo para basico-v3
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}

