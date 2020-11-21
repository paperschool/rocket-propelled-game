import Vector from "../Vector";
import TileType from "./TileType";

class Tile {
    type: TileType = TileType.Default;
    position: Vector;

    constructor(position: Vector){
        this.position = position;
    }

    serialise(): any {
        return {
            type: this.type,
            position: this.position.serialise()
        }
    }
}

export default Tile;