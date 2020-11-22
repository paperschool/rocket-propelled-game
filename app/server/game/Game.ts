import Vector from "./Vector";
import Map from "./Map";
import Players from "./Players";
class Game {

    private map: Map;
    public players: Players;
    public started: boolean = false;
    
    constructor(){
        this.map = new Map(new Vector(10,10));
        this.map.generate()
        this.map.populate()

        this.players = new Players()
    }

    serialise(){
        return this.map.serialise()
    }
    
    serialiseForPlayer(deviceId: string){

    }
}

export default Game;