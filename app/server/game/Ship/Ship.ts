import Map from '../Map';
import Vector from '../Vector';
import ShipStats from './ShipStats';

class Ship {
    // device id of the player
    id: string;

    ready = false;

    // tile position
    position: Vector;

    // fuel for movement
    fuel: number;

    map: Map;

    // engine / thrust power
    engine: ShipStats = ShipStats.Medium;

    // communication with home
    communication: ShipStats = ShipStats.Medium;

    // navigation / piloting ability
    navigation: ShipStats = ShipStats.Medium;

    // power / ability of the rocket company
    corporation: ShipStats = ShipStats.Medium;

    constructor(id: string, startPosition: Vector, mapSize: Vector) {
        this.id = id;
        this.position = startPosition;

        const map = new Map(mapSize);
    }

    isReady() {
        return this.ready;
    }
}

export default Ship;
