import Vector from "../Vector";
import Tile from "./Tile";
import TileType from "./TileType";

class GoalTile extends Tile {

    type: TileType = TileType.Goal;

    constructor(position: Vector){
        super(position);
    }

}

export default GoalTile;