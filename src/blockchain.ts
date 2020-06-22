import { Block } from './block';


export class BlockChain {

    private chain: Block[] = [];
    
    constructor() { }

    // Agregar un bloque
    public agregar( block: Block ) {

        this.chain.push( block );
        console.log( this.chain );
        return block
    }

    /* public actualizarNombre( id: string, nombre: string, sala: string) {

        for( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                usuario.sala = sala
                break;
            }

        }


        console.log('===== Actualizando usuario ====');
        console.log( this.lista );

    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    // Obtener un usuario
    public getUsuario( id: string ) {

        return this.lista.find( usuario => usuario.id === id );

    }

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario =>usuario.sala === sala );

    }

    // Borrar Usuario
    public borrarUsuario( id: string ) {

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
        
    } */


}
