import AbstractTile from './tiles/AbstractTile';
import Vector from './utils/Vector';
import DynamicTile from './tiles/DynamicTile';

export default class Map {
    private map: AbstractTile[][];

    constructor(private pos: Vector, private tileSize: Vector, mapData: any[][]) {
        this.map = [];
        for (const [colIndex, col] of mapData.entries()) {
            this.map.push([]);
            for (const tileData of col) {
                try {
                    const tile = <AbstractTile>(
                        new DynamicTile(
                            tileData.type,
                            new Vector(
                                this.pos.x + tileData.position.x * tileSize.x,
                                this.pos.y + tileData.position.y * tileSize.y
                            ),
                            this.tileSize
                        )
                    );
                    this.map[colIndex].push(tile);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        console.log('map', this.map);
    }

    draw(p5: any) {
        p5.noStroke();
        for (const col of this.map) {
            for (const tile of col) {
                tile.draw(p5);
            }
        }
    }
}
