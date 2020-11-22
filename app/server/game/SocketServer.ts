import Socket, { Server } from 'socket.io';

import State from './Rooms/State';
import { validateMessage, Message } from './Message';

import { CONNECT_CLIENT, DISCONNECT_CLIENT } from './constants';

const state = new State();

export const createRoom = (deviceId: string) => {
    return state.getRooms().createRoom(deviceId);
};

export const validateRoom = (deviceId: string, roomCode: string) => {
    return state.getRooms().roomExists(roomCode);
};

const on = (
    socket: Socket.Socket,
    messageType: string,
    optionalPayload: boolean,
    handler: (validatedMessage: Message) => void
) => {
    socket.on(messageType, (messagePayload: any) => {
        if (validateMessage(messagePayload, optionalPayload)) {
            handler(messagePayload);
        }
    });
};

const SocketInterface = async (httpServer: any) => {
    const io = Socket(httpServer, { serveClient: false });

    io.on('connection', (client) => {
        // event handler for when client sends initial handshake message
        on(client, CONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();

            rooms.addClient(deviceId, roomCode, client);
        });

        // event handler for when client sends disconnect message
        on(client, DISCONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();
            const room = rooms.getRoomById(roomCode);
            if (room) {
                room.detatchClient(deviceId);
            }
        });
    });
};

export default SocketInterface;
