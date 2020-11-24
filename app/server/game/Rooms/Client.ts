import { CLIENT_GAME_STATE_READY, DISCONNECT_CLIENT, SPAM_WARN_CLIENT } from '../constants';
import Game from '../Game/Game';
import { Message } from '../Message';
import SocketEventHelper from '../SocketEventHelper';

export default class Client {
    private ip: string;
    private deviceId: string;
    private socket: SocketIO.Socket;
    private lastModified: number;
    private game: Game;

    constructor(deviceId: string, socket: any) {
        this.deviceId = deviceId;
        this.socket = socket;
        this.ip = this.deriveIp();

        this.setupListeners();
    }

    // game interaction specific methods
    setGame(game: Game): void {
        this.game = game;
    }

    joinGame(): void {
        if (this.game) {
            this.game.addPlayer(this.deviceId);
        }
    }

    leaveGame(): void {
        if (this.game) {
            this.game.removePlayer(this.deviceId);
        }
    }

    setupListeners() {
        SocketEventHelper(this.socket, CLIENT_GAME_STATE_READY, true, ({ deviceId }: Message) => {
            this.game.readyPlayer(deviceId);
        });
    }

    // connection specific methods

    getIp() {
        return this.ip;
    }

    getDeviceId() {
        return this.deviceId;
    }

    deriveIp() {
        return this.socket.request.connection.remoteAddress;
    }

    resetLastModified() {
        this.lastModified = Date.now();
    }

    relink(deviceId: string, socket: SocketIO.Socket) {
        this.deviceId = deviceId;
        this.socket = socket;
        this.ip = this.deriveIp();
    }

    disconnect() {
        this.leaveGame();

        this.emit(DISCONNECT_CLIENT);
    }

    spamWarn() {
        this.resetLastModified();
        this.emit(SPAM_WARN_CLIENT);
    }

    emit(emitKey: string, emitValue?: any) {
        this.socket.emit(emitKey, emitValue);
    }
}
