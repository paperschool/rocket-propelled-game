import Map from "./Map";
import Vector from "./Vector";

class Game {

    private map: Map;
    private player: any;
    public started: boolean = false;
    
    constructor(){
        this.map = new Map(new Vector(10,10));
        this.map.generate()
    }

    serialise(){
        return this.map.serialise()
    }

}

export default Game;