import Vector from '../Vector';
import Tile from './Tile';
import TileType from './TileType';

class StartTile extends Tile {
    type: TileType = TileType.Start;

    constructor(position: Vector) {
        super(position);
    }
}

export default StartTile;
