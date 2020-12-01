import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class HostileTile extends AbstractTile {
    private type = TileType.HOSTILE;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#C62828');
        super.draw(p5);
    }
}
