class Vector {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    serialise() {
        return {
            x: this.x,
            y: this.y,
        };
    }
}

export default Vector;
