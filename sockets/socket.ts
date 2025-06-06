import { Socket } from 'socket.io';
import { Server as socketIO } from "socket.io";

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
}

export const message = (client: Socket, io: socketIO) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('Received message:', payload);
        io.emit('new-message', payload);
    });
}