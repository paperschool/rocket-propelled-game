
class Vector {

    x: number = 0;
    y: number = 0;

    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    serialise() {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export default Vector;