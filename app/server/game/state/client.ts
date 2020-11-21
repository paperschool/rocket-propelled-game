import {
    DISCONNECT_CLIENT,
    SPAM_WARN_CLIENT
} from "../constants";

export default class Client {

    private ip: string;
    private deviceId: string;
    private socket: SocketIO.Socket;
    private lastModified: number;

    constructor(deviceId: string, socket: any) {
        this.deviceId = deviceId;
        this.socket = socket
        this.ip = this.deriveIp();
    }

    getIp() {
        return this.ip;
    }

    getDeviceId() {
        return this.deviceId;
    }

    deriveIp() {
        return this.socket.request.connection.remoteAddress
    }


    resetLastModified() {
        this.lastModified = Date.now()
    }

    relink(deviceId: string, socket: SocketIO.Socket) {
        this.deviceId = deviceId;
        this.socket = socket;
        this.ip = this.deriveIp();
    }

    disconnect() {
        this.emit(DISCONNECT_CLIENT);
    }

    spamWarn() {
        this.resetLastModified()
        this.emit(SPAM_WARN_CLIENT);
    }

    emit(emitKey: string, emitValue?: any) {
        this.socket.emit(emitKey, emitValue)
    }
}
