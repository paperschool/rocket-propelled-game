import { randomInt, random } from "./Utility";

export class Animation {

    private size: Vector
    private pos: Vector
    private sneakers: Sneakers;

    constructor() {
        this.size = this.getCanvasSize();
        this.sneakers = new Sneakers(this.size, 50);
    }

    getCanvasSize() {
        return new Vector(
            window.innerWidth - 20,
            window.innerHeight - 20,
        )
    }

    resize(p5: any) {
        const { x, y } = this.getCanvasSize()
        this.size = this.getCanvasSize();

        this.sneakers.setSize(this.size);

        p5.resizeCanvas(x, y);
    }

    setup(p5: any, canvasParentRef: any) {
        const { x, y } = this.getCanvasSize()
        p5.createCanvas(x, y).parent(canvasParentRef);
    }

    draw(p5: any) {
        p5.background(255, 255, 255, 30);
        this.sneakers.update();
        this.sneakers.draw(p5);
    }

}

class Sneakers {

    private size: Vector;
    private sneakers: Sneaker[]

    constructor(size: Vector, count: number) {
        this.setSize(size);
        this.sneakers = new Array(count).fill(0).map(() =>
            new Sneaker(this.randomPoint())
        );
    }

    getSize() {
        return this.size;
    }

    setSize(size: Vector) {
        this.size = size;
    }

    randomPoint() {
        return new Vector(
            randomInt(0, this.size.x),
            randomInt(0, this.size.y)
        )
    }

    putSneakerInBounds(sneaker: Sneaker) {
        const { x, y } = sneaker.getPos();
        const size = sneaker.getSize();
        let moved = false;

        if ((size.x / 2) - x > 0) {
            sneaker.getPos().x = this.size.x - (size.x / 2)
            moved = true;
        }
        if ((size.x / 2) + x > this.size.x) {
            sneaker.getPos().x = 0 + (size.x / 2)
            moved = true;
        }
        if ((size.y / 2) - y > 0) {
            sneaker.getPos().y = this.size.y - (size.y / 2)
            moved = true;
        }
        if ((size.y / 2) + y > this.size.y) {
            sneaker.getPos().y = 0 + (size.y / 2)
            moved = true;
        }

        return moved;
    }

    update() {
        this.sneakers.forEach((sneaker: Sneaker) => {
            if (this.putSneakerInBounds(sneaker)) {
                sneaker.resetTrail();
            }
            sneaker.update()
        });
    }

    draw(p5: any) {
        this.sneakers.forEach((sneaker: Sneaker) => sneaker.draw(p5));
    }

}

class Sneaker {

    private oldPos: Vector;
    private pos: Vector;
    private size: Vector;
    private speed: number;
    private trail: Vector[] = [];
    private trailLength: number;
    private moveSteps: number = 0;

    private lastMoved: number;

    constructor(startPos: Vector) {
        this.oldPos = new Vector().set(startPos);
        this.pos = new Vector().set(startPos);
        this.size = new Vector(1, 1).scale(randomInt(5, 40));
        this.trailLength = randomInt(5, 10);
        this.speed = randomInt(0, 2000);
        this.lastMoved = Date.now();

    }

    getPos() {
        return this.pos;
    }

    getSize() {
        return this.size;
    }

    move() {
        if (Date.now() - this.lastMoved > this.speed) {
            this.pos.x += randomInt(-1, 1) * this.size.x;
            this.pos.y += randomInt(-1, 1) * this.size.x;
            this.trail.push(new Vector().set(this.pos));
            this.lastMoved = Date.now();
            this.moveSteps++;
        }
    }

    resetTrail() {
        this.oldPos.set(this.pos);
        this.moveSteps = 0;
        this.trail = []
    }

    trailCheck() {
        if (this.trailLength === this.moveSteps) {
            this.resetTrail();
            this.trail = this.trail.slice(1, this.trailLength - 1);
        }
    }

    update() {
        this.move();
        this.trailCheck();
    }

    draw(p5: any) {

        p5.stroke(100, 200, 100, 100);
        this.trail.forEach((point: Vector, index: number, trail: Vector[]) => {

            const nextPoint = index + 1 === trail.length
                ? point
                : trail[index + 1]


            p5.line(
                point.x,
                point.y,
                nextPoint.x,
                nextPoint.y
            )
        })

        p5.noStroke();
        p5.fill(100, 200, 100, 60)
        p5.ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

}

class Vector {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set(other: Vector) {
        this.x = other.x
        this.y = other.y
        return this;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
}