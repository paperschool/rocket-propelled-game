import Vector from '../Vector';
import Tile from './Tile';
import TileType from './TileType';

class RefuelTile extends Tile {
    type: TileType = TileType.Refuel;

    constructor(position: Vector) {
        super(position);
    }
}

export default RefuelTile;
