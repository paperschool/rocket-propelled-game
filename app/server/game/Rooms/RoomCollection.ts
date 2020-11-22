import { ROOM_INVALID, ROOM_VALID } from '../constants';
import Room from './Room';

export default class RoomCollection {
    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    getRooms() {
        return this.rooms;
    }

    getRoomById(roomId: string) {
        return this.rooms.find((room: Room) => room.getId() === roomId);
    }

    getRoomByDeviceId(deviceId: string) {
        return this.rooms.find((room: Room) => room.getClients().clientExists(deviceId));
    }

    createRoom(deviceId: string) {
        const devicesExistingRoom = this.getRoomByDeviceId(deviceId);

        if (devicesExistingRoom) {
            devicesExistingRoom.detatchClient(deviceId);
        }

        const newRoom = new Room(this.generateUniqueRoomCode(), this.deleteRoom.bind(this), deviceId);

        this.rooms.push(newRoom);
        console.server('Created New Room', newRoom.getId());

        return newRoom;
    }

    deleteRoom(roomId: string) {
        if (this.roomExists(roomId)) {
            console.server(`Room ${roomId} Self Destructed...`);
            this.rooms = this.rooms.filter((room: Room) => room.getId() !== roomId);
        }
    }

    roomExists(roomId: string) {
        return this.getRoomById(roomId) !== undefined;
    }

    roomsClientBelongsTo(deviceId: string) {
        return this.getRooms().filter((currentRoom: Room) => currentRoom.getClients().getClientByDeviceId(deviceId));
    }

    clientExists(deviceId: string) {
        return this.getRooms().reduce((clientExistance: boolean, currentRoom: Room) => {
            return clientExistance && currentRoom.getClients().clientExists(deviceId);
        }, true);
    }

    addClient(deviceId: string, roomCode: string, socket: SocketIO.Socket) {
        const room = this.getRoomById(roomCode);

        if (room) {
            room.addClient(deviceId, socket);

            const clientRooms = this.roomsClientBelongsTo(deviceId);
            if (clientRooms[0].getId() !== roomCode) {
                clientRooms[0].detatchClient(deviceId);
            }

            socket.emit(ROOM_VALID);
        } else {
            console.server(`Requested Room ${roomCode} Does Not Exist...`);
            socket.emit(ROOM_INVALID);
        }
    }

    detatchClient(deviceId: string, roomCode: string, socket: SocketIO.Socket) {
        const room = this.getRoomById(roomCode);

        if (room) {
            room.detatchClient(deviceId);
        } else {
            console.server(`Requested Room ${roomCode} Does Not Exist...`);
        }
    }

    randomCharacter() {
        const usableCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return usableCharacters.charAt(Math.floor(Math.random() * usableCharacters.length));
    }

    generateRoomCode() {
        return [
            this.randomCharacter(),
            this.randomCharacter(),
            this.randomCharacter(),
            this.randomCharacter(),
            '-',
            this.randomCharacter(),
            this.randomCharacter(),
            this.randomCharacter(),
            this.randomCharacter(),
        ].join('');
    }

    generateUniqueRoomCode() {
        let unique = false,
            candidateRoomCode;

        while (!unique) {
            candidateRoomCode = this.generateRoomCode();
            unique = !this.roomExists(candidateRoomCode);
        }

        return candidateRoomCode;
    }
}
