import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class NeutralTile extends AbstractTile {
    private type = TileType.NEUTRAL;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#9E9E9E');
        super.draw(p5);
    }
}
