import Vector from '../Vector';
import Ship from './Ship';

class Ships {
    private ships: Ship[] = [];
    private minimumPlayerCount: number;

    constructor(minimumPlayerCount: number) {
        this.minimumPlayerCount = minimumPlayerCount;
    }

    count(): number {
        return this.ships.length;
    }

    setShipReadiness(deviceId: string): void {
        this.getShipById(deviceId).ready = true;
    }

    isReady(): boolean {
        return (
            this.ships.reduce((shipsReadiness, ship) => shipsReadiness && ship.isReady(), true) &&
            this.minimumPlayerCount <= this.ships.length
        );
    }

    getShipById(deviceId: string): Ship {
        return this.ships.find((existingShip) => existingShip.id === deviceId);
    }

    shipExists(deviceId: string): boolean {
        return typeof this.getShipById(deviceId) !== 'undefined';
    }

    addShip(deviceId: string, startPosition: Vector, mapSize: Vector) {
        if (!this.shipExists(deviceId)) {
            this.ships.push(new Ship(deviceId, startPosition, mapSize));
        }
    }

    removeShip(deviceId: string) {
        if (this.shipExists(deviceId)) {
            const existingShipIndex = this.ships.findIndex((ship) => ship.id === deviceId);

            this.ships = [
                ...this.ships.slice(0, existingShipIndex - 1),
                ...this.ships.slice(existingShipIndex + 1, this.ships.length - 1),
            ];
        }
    }
}

export default Ships;
