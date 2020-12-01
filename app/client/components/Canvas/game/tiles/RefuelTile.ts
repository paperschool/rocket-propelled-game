import Vector from '../utils/Vector';
import AbstractTile from './AbstractTile';
import TileType from './TileType';

export default class RefuelTile extends AbstractTile {
    private type = TileType.REFUEL;

    constructor(protected pos: Vector, protected size: Vector) {
        super(pos, size);
    }

    draw(p5: any) {
        p5.fill('#FF9800');
        super.draw(p5);
    }
}
