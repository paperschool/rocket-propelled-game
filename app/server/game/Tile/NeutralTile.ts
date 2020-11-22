import Vector from "../Vector";
import Tile from "./Tile";
import TileType from "./TileType";

class NeutralTile extends Tile {

    type: TileType = TileType.Neutral;

    constructor(position: Vector){
        super(position);
    }

}

export default NeutralTile;