import ClientCollection from "./clientCollection";

import {
    REFRESH_DATA,
} from "../constants";
import Client from "./client";

type RoomSelfDestructCallbackFn = (roomId: string) => void;

export default class Room {

    private id: string;
    private admin: string;
    private clients: ClientCollection;

    private selfDestructCallbackFn: RoomSelfDestructCallbackFn;
    private selfDestructTimeout: NodeJS.Timeout;
    private selfDestructTTL: number = 30000; // ms

    constructor(id: string, selfDestructCallbackFn: RoomSelfDestructCallbackFn, adminDeviceId: string) {
        this.id = id;
        this.selfDestructCallbackFn = selfDestructCallbackFn;
        this.clients = new ClientCollection()
        this.admin = adminDeviceId;

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
        this.getClients().addClient(deviceId, socket);
        this.cleanUp()
        this.broadcastPayload()
    }

    detatchClient(deviceId: string) {
        console.server(`Detching Client from ${this.id}!`);
        this.getClients().detatchClient(deviceId);
        this.broadcastPayload();
        // need to add admin clean up / migration
        this.cleanUp();
    }

    cleanUp() {
        if (this.clients.getClientCount() <= 0) {
            this.scheduleSelfDestruct();
        } else {
            this.descheduleSelfDestruct()
        }
    }

    descheduleSelfDestruct() {
        clearTimeout(this.selfDestructTimeout);
    }

    scheduleSelfDestruct() {
        this.descheduleSelfDestruct()
        this.selfDestructTimeout = setTimeout(() => {
            this.selfDestructCallbackFn(this.getId());
        }, this.getSelfDestructTTL());
    }

    createPayload() {
        return { foo: "test payload" }
    }

    broadcast(emitKey: string, emitValue: any) {
        this.clients.broadcast(emitKey, emitValue)
    }

    broadcastPayload() {
        const roomPayload = this.createPayload();
        this.broadcast(REFRESH_DATA, roomPayload);
    }

    clientExists(deviceId: string) {
        return this.getClients().clientExists(deviceId);
    }
}