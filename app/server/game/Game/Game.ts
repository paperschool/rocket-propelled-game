import Vector from '../Vector';
import Map from '../Map';
import GameState from './GameState';
import GameStates from './GameStates';
import Ships from '../Ship/Ships';
import { randomInt } from '../../../client/components/Canvas/Utility';
class Game {
    private startPosition: Vector;
    private mapSize: Vector;

    private map: Map;
    public ships: Ships;
    public state: GameState;
    private minimumShips = 2;

    constructor() {
        this.state = new GameState();

        this.mapSize = new Vector(10, 10);

        this.startPosition = new Vector(randomInt(0, this.mapSize.x - 1), randomInt(0, this.mapSize.y - 1));

        this.map = new Map(this.mapSize);
        this.map.generate();
        this.map.populateTiles();

        this.ships = new Ships(this.minimumShips);

        this.setup();
    }

    setup() {
        // put state transition events here
        this.state.registerTransition(
            GameStates.Initial,
            GameStates.Start,
            (() => {
                return this.ships.isReady();
            }).bind(this)
        );

        this.state.registerListener(GameStates.Initial, GameStates.Start, 'game-player-ready-start', () => {
            // thing that should happen when everyone is ready;
            console.log('Game Started!');
        });
    }

    addPlayer(deviceId: string) {
        this.ships.addShip(deviceId, this.startPosition, this.mapSize);
    }

    removePlayer(deviceId: string) {
        this.ships.removeShip(deviceId);
    }

    readyPlayer(deviceId: string) {
        this.ships.setShipReadiness(deviceId);

        // validation of this change is performed by the state transition module
        this.state.transitionTo(GameStates.Initial, GameStates.Start);
    }

    canEnd() {
        return this.state.getState() !== GameStates.Initial && this.ships.count() < this.minimumShips; // or paused?
    }

    serialise() {
        return {
            map: this.map.serialise(),
        };
    }

    serialiseForPlayer(deviceId: string) {}
}

export default Game;
