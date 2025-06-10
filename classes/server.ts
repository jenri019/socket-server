import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server as socketIO } from "socket.io";
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO(this.httpServer); // <-- así se instancia
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        this.io.on('connection', (client) => {
            //Connect client
            socket.connectClient(client);

            //Config user
            socket.message(client, this.io);
            socket.privateMessage(client, this.io);
            socket.configUser(client, this.io);
            socket.getUsers(client, this.io);
            socket.disconnect(client, this.io);
        });
    }

    start(callback: () => void): void {
        this.httpServer.listen(this.port, callback);
    }
}