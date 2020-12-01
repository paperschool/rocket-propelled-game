import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class GoalTile extends AbstractTile {
    private type = TileType.GOAL;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#FFEB3B');
        super.draw(p5);
    }
}
