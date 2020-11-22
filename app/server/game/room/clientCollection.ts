import Client from './Client';

export default class ClientCollection {
    private clients: Client[];

    constructor() {
        this.clients = [];
    }

    getClients() {
        return this.clients;
    }

    setClients(clients: Client[]) {
        this.clients = clients;
    }

    getClientByDeviceId(deviceId: string) {
        return this.getClients().find((client: Client) => client.getDeviceId() === deviceId);
    }

    getClientCount() {
        return this.getClients().length;
    }

    addClient(deviceId: string, socket: SocketIO.Socket) {
        // check if client already exists
        if (!this.clientExists(deviceId)) {
            const newClient = new Client(deviceId, socket);

            this.clients.push(newClient);
        } else {
            const client = this.getClientByDeviceId(deviceId);
            console.server('Disconnecting Old Client...');
            client.disconnect();
            client.relink(deviceId, socket);
        }
    }

    detatchClient(deviceId: string) {
        if (this.clientExists(deviceId)) {
            console.server(`Detching Client ${deviceId}...`);
            this.getClientByDeviceId(deviceId).disconnect();
            this.setClients(this.getClients().filter((client: Client) => client.getDeviceId() !== deviceId));
        } else {
            console.server(`Could Not Detatch Unknown Client ${deviceId}...`);
        }
    }

    detachAllClients() {
        this.getClients().forEach((client) => this.detatchClient(client.getDeviceId()));
    }

    clientExists(deviceId: string) {
        return this.getClientByDeviceId(deviceId) !== undefined;
    }

    broadcast(emitKey: string, emitValue: any) {
        this.clients.forEach((client: Client) => client.emit(emitKey, emitValue));
    }
}
