import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class StartTile extends AbstractTile {
    private type = TileType.START;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#8BC34A');
        super.draw(p5);
    }
}
