import Vector from '../utils/Vector';

export default abstract class Tile {
    constructor(protected pos: Vector, protected size: Vector) {}

    draw(p5: any) {
        p5.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}
