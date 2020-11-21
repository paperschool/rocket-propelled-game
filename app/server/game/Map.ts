import NeutralTile from "./Tile/NeutralTile";
import Tile from "./Tile/Tile";
import Vector from "./Vector";

class Map {

    // schema is [x][y]
    private coordinates: Tile[][] = [[]]; 
    private size: Vector;

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