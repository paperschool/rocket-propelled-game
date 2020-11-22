import Vector from '../Vector';
import Tile from './Tile';
import TileType from './TileType';

class WarpTile extends Tile {
    type: TileType = TileType.Warp;

    constructor(position: Vector) {
        super(position);
    }
}

export default WarpTile;
