import ClientCollection from './ClientCollection';
import { REFRESH_DATA } from '../constants';
import Game from '../Game/Game';

type RoomSelfDestructCallbackFn = (roomId: string) => void;

export default class Room {
    private id: string;
    private admin: string;
    private clients: ClientCollection;
    private game: Game;

    private selfDestructCallbackFn: RoomSelfDestructCallbackFn;
    private selfDestructTimeout: NodeJS.Timeout;
    private selfDestructTTL = 30000; // ms

    constructor(id: string, selfDestructCallbackFn: RoomSelfDestructCallbackFn, adminDeviceId: string) {
        this.id = id;
        this.selfDestructCallbackFn = selfDestructCallbackFn;
        this.clients = new ClientCollection();
        this.admin = adminDeviceId;
        this.game = new Game();

        this.cleanUp();
    }

    getId() {
        return this.id;
    }

    getClients() {
        return this.clients;
    }

    getSelfDestructTTL() {
        return this.selfDestructTTL;
    }

    setAdmin(deviceId: string) {
        this.admin = deviceId;
    }

    addClient(deviceId: string, socket: SocketIO.Socket) {
        console.server(`Client added to ${this.id}!`);

        const client = this.getClients().addClient(deviceId, socket);

        client.setGame(this.game);
        client.joinGame();

        this.cleanUp();
        this.broadcastPayload();
    }

    detatchClient(deviceId: string) {
        console.server(`Detching Client from ${this.id}!`);
        this.getClients().detatchClient(deviceId);

        this.broadcastPayload();
        this.cleanUp();
    }

    cleanUp() {
        if (this.game.canEnd()) {
            this.scheduleSelfDestruct();
        } else if (this.clients.getClientCount() == 0) {
            this.scheduleSelfDestruct();
        } else {
            this.descheduleSelfDestruct();
        }
    }

    descheduleSelfDestruct() {
        clearTimeout(this.selfDestructTimeout);
    }

    scheduleSelfDestruct() {
        this.descheduleSelfDestruct();
        console.server(`Scheduled Destruction of Room ${this.id}`);
        this.selfDestructTimeout = setTimeout(() => {
            this.getClients().detachAllClients();
            this.selfDestructCallbackFn(this.getId());
        }, this.getSelfDestructTTL());
    }

    createPayload() {
        return { game: this.game.serialise() };
    }

    broadcast(emitKey: string, emitValue: any) {
        this.clients.broadcast(emitKey, emitValue);
    }

    broadcastPayload() {
        const roomPayload = this.createPayload();
        this.broadcast(REFRESH_DATA, roomPayload);
    }

    clientExists(deviceId: string) {
        return this.getClients().clientExists(deviceId);
    }
}
