import Map from './game/Map';
import Vector from './game/utils/Vector';
// import { randomInt } from './utils/math';

export class Animation {
    private size: Vector;
    private pos: Vector;

    private map: Map;

    constructor() {
        this.size = this.getCanvasSize();
    }

    getCanvasSize() {
        return new Vector(window.innerWidth - 20, window.innerHeight - 20);
    }

    resize(p5: any) {
        const { x, y } = this.getCanvasSize();
        this.size = this.getCanvasSize();

        p5.resizeCanvas(x, y);
    }

    setup(p5: any, canvasParentRef: any) {
        const { x, y } = this.getCanvasSize();
        p5.createCanvas(x, y).parent(canvasParentRef);
    }

    draw(p5: any) {
        p5.background(255, 255, 255, 30);
        if (this.map) this.map.draw(p5);
    }

    refreshData(mapData: any) {
        console.log('refreshData', mapData);
        this.map = new Map(new Vector(50, 50), new Vector(100, 100), mapData);
    }
}
