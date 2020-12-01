import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class WarpTile extends AbstractTile {
    private type = TileType.WARP;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#009688');
        super.draw(p5);
    }
}
