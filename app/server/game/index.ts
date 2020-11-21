import Socket, { Server } from "socket.io";

import State from "./state/state";
import { validateMessage, Message } from "./message";

import {
    CONNECT_CLIENT, DISCONNECT_CLIENT
} from "./constants"

const state = new State();

export const createRoom = (deviceId: string) => {
    return state.getRooms().createRoom(deviceId)
}

export const validateRoom = (deviceId: string, roomCode: string) => {
    return state.getRooms().roomExists(roomCode);
}

const on = (socket: Socket.Socket, messageType: string, optionalPayload: boolean, handler: (validatedMessage: Message) => void) => {
    socket.on(messageType, (messagePayload: any) => {
        if (validateMessage(messagePayload, optionalPayload)) {
            handler(messagePayload)
        }
    });
}

const SocketInterface = async (httpServer: any) => {

    const io = Socket(httpServer, { serveClient: false });

    io.on('connection', client => {

        on(client, CONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();

            rooms.addClient(deviceId, roomCode, client)
        })

        on(client, DISCONNECT_CLIENT, true, ({ deviceId, roomCode }: Message) => {
            const rooms = state.getRooms();
            const room = rooms.getRoomById(roomCode);
            if (room) {
                room.detatchClient(deviceId)
            }
        })

        // client.on(CONNECT_CLIENT, ({ roomId, deviceId }) => {

        //     const rooms = state.getRooms();

        //     rooms.addClient(roomId, deviceId, client)
        // });


    });

}

export default SocketInterface;