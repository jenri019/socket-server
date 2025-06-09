import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/socket';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'GET Mensajes OK',
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const { body, from } = req.body;

    const payload = {
        from,
        body,
    }

    const server = Server.instance;
    server.io.emit('new-message', payload);
    res.json({
        ok: true,
        message: 'POST Listo',
        body,
        from,
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const { body, from } = req.body;
    const { id } = req.params;

    const payload = {
        from,
        body,
    }

    const server = Server.instance;
    server.io.to(id).emit('private-message', payload);
    res.json({
        ok: true,
        body,
        from,
        id
    });
});

// Get all user id
router.get('/users', (req: Request, res: Response) => {
    try {
        const server = Server.instance;
        const clients = Array.from(server.io.sockets.sockets.keys());
        res.json({
            ok: true,
            clients
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los usuarios conectados',
            error
        });
    }
});

// Get user details
router.get('/users/details', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        clients: connectedUsers.getUserlist()
    });
});

export default router;