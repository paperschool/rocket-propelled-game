import Vector from "../Vector";
import Tile from "./Tile";
import TileType from "./TileType";

class HostileTile extends Tile {

    type: TileType = TileType.Hostile;

    constructor(position: Vector){
        super(position);
    }

}

export default HostileTile;