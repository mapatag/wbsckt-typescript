import { Socket } from 'socket.io';
import * as socketIO from 'socket.io';
import { UsuariosLista } from './usuarios-lista'; // -> nuevo para basico-v3
import { Usuario } from './usuario';              // -> nuevo para basico-v3 

export const usuariosConectados = new UsuariosLista(); // -> nuevo para basico-v3

export const conectarCliente = ( cliente: Socket ) => { // -> nuevo para basico-v3
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {  // -> nuevo para v4 agregamos io: socketIO.Server
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario( cliente.id ); // -> nuevo para basico-v3
        io.emit('usuarios-activos', usuariosConectados.getLista()  ); // -> nuevo para basico-v4
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
        io.emit('usuarios-activos', usuariosConectados.getLista()  ); // -> nuevo para basico-v4
        
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}

// Obtener Usuarios
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista()  );
        
    });

}

