import Vector from './Vector';
import Map from './Map';
import Players from './Players';
class Game {
    private map: Map;
    public players: Players;
    public started = false;

    constructor() {
        this.map = new Map(new Vector(10, 10));
        this.map.generate();
        this.map.populateTiles();

        this.players = new Players();
    }

    serialise() {
        return this.map.serialise();
    }

    // eslint-disable-next-line
    serialiseForPlayer(deviceId: string) {}
}

export default Game;
