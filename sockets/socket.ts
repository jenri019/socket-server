import { Socket } from 'socket.io';
import { Server as socketIO } from "socket.io";
import { Userlist } from '../classes/userlist';
import { User } from '../classes/user';

export const connectedUsers = new Userlist();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
}

export const disconnect = (client: Socket, io: socketIO) => {
    client.on('disconnect', () => {
        connectedUsers.deleteUser(client.id);

        // Emit an event to notify all clients that a user has disconnected
        io.emit('active-users', connectedUsers.getUserlist());

    });
}

export const message = (client: Socket, io: socketIO) => {
    client.on('message', (payload: { from: string, body: string }) => {
        io.emit('new-message', payload);
    });
}

export const configUser = (client: Socket, io: socketIO) => {
    client.on('config-user', (payload: { username: string }, callback: Function) => {
        connectedUsers.updateNname(client.id, payload.username);
        io.emit('active-users', connectedUsers.getUserlist());
        callback({
            ok: true,
            message: `User ${payload.username} configured successfully`
        });
    });
}

// Get all connected users when app requests it
export const getUsers = (client: Socket, io: socketIO) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', connectedUsers.getUserlist());
    });
}