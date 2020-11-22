import RoomCollection from "./RoomCollection";

class State {
    private rooms: RoomCollection;
    private modificationCoolDown: number = 1000;

    constructor() {
        this.rooms = new RoomCollection();
    }

    getRooms() {
        return this.rooms;
    }
}

export default State;