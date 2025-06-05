import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server as socketIO } from "socket.io";
import http from 'http';

export default class Server {
    public app: express.Application;
    public port: number;
    public io: socketIO;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO(this.httpServer); // <-- así se instancia
    }

    private listenSockets() {
        console.log('Listening for socket connections');
        this.io.on('connection', (client) => {
            console.log('Client connected');
        });
    }

    start(callback: () => void): void {
        this.httpServer.listen(this.port, callback);
    }
}