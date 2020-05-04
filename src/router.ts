import { Router, Request, Response } from 'express';
import Server from './server'; // nuevo para basico-v3

const router = Router();

router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { cuerpo, de };  // nuevo para basico-v3

    const server = Server.instance;  // nuevo para basico-v3
    server.io.emit('mensaje-nuevo', payload );  // nuevo para basico-v3
    
    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = {  // nuevo para basico-v3
        de,
        cuerpo
    }

    const server = Server.instance;  // nuevo para basico-v3
    server.io.in( id ).emit( 'mensaje-privado', payload );  // nuevo para basico-v3
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});



export default router;


