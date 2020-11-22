import NeutralTile from "./Tile/NeutralTile";
import Tile from "./Tile/Tile";
import Vector from "./Vector";
import { flip } from "./Utilities";
import HostileTile from "./Tile/HostileTile";
import RefuelTile from "./Tile/RefuelTile";
import WarpTile from "./Tile/WarpTile";

class Map {

    // schema is [x][y]
    private coordinates: Tile[][] = [[]]; 
    private size: Vector;

    private hostileTileLikelihood: number = 10;
    private refuelTileLikelihood: number = 10;
    private warpTileLikelihood: number = 5;

    constructor(size: Vector){
        this.size = size;
    }

    generate(): void {
        for(let x = 0; x < this.size.x; x++){
            this.coordinates.push([]);
            for(let y = 0; y < this.size.y; y++){
                this.coordinates[x].push(new NeutralTile(new Vector(x,y)));
            }   
        }
    }

    // random generator for map layout
    populate(): void {

        this.coordinates = this.coordinates.map(col => {
            return col.map(row => {
                let currentPosition = row.position;

                if(flip(this.hostileTileLikelihood)){
                    row = new HostileTile(currentPosition);
                } else if(flip(this.refuelTileLikelihood)){
                    row = new RefuelTile(currentPosition);
                } else if(flip(this.warpTileLikelihood)){
                    row = new WarpTile(currentPosition);
                }

                return row;


            })
        })

    }

    serialise(): any {
        let serialisedMap: any = [];

        this.coordinates.forEach((col,colIndex) => {
            serialisedMap.push([]);

            col.forEach(row => {
                serialisedMap[colIndex].push(
                    row.serialise()
                )
            })
        })

        return serialisedMap;
    }

}

export default Map;