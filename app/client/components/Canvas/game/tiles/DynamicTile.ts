import TileType from './TileType';
import NeutralTile from './NeutralTile';
import HostileTile from './HostileTile';
import RefuelTile from './RefuelTile';
import WarpTile from './WarpTile';
import GoalTile from './GoalTile';
import StartTile from './StartTile';

export default class DynamicTile {
    constructor(tileType: TileType, ...args: any) {
        if (!TileClass[tileType]) {
            throw new Error(`Tile type '${tileType}' does not have a class`);
        }
        return new TileClass[tileType](...args);
    }
}

const TileClass: any = {
    [TileType.NEUTRAL]: NeutralTile,
    [TileType.HOSTILE]: HostileTile,
    [TileType.REFUEL]: RefuelTile,
    [TileType.WARP]: WarpTile,
    [TileType.GOAL]: GoalTile,
    [TileType.START]: StartTile,
};
