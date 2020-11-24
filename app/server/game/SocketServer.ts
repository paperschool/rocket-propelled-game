import Socket from 'socket.io';
import SocketEventHelper from './SocketEventHelper';

import State from './Rooms/State';

import { CONNECT_CLIENT, DISCONNECT_CLIENT } from './constants';
import { Message } from './Message';

const state = new State();

export const createRoom = (deviceId: string) => {
    return state.getRooms().createRoom(deviceId);
};

export const validateRoom = (deviceId: string, roomCode: string) => {
    return state.getRooms().roomExists(roomCode);
};

const SocketInterface = async (httpServer: any) => {
    const io = Socket(httpServer, { serveClient: false });

    io.on('connection', (client) => {
        // event handler for when client sends initial handshake message
        SocketEventHelper(client, CONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();

            rooms.addClient(deviceId, roomCode, client);
        });

        // event handler for when client sends disconnect message
        SocketEventHelper(client, DISCONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();
            const room = rooms.getRoomById(roomCode);
            if (room) {
                room.detatchClient(deviceId);
            }
        });
    });
};

export default SocketInterface;
