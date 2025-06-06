import { Socket } from 'socket.io';

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
}

export const message = (client: Socket) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('Received message:', payload);
    });
}