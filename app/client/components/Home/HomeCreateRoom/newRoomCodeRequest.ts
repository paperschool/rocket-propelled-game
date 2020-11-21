import { createNewRoom as createNewRoomRequest } from "../../../services/game"

const createNewRoom = async (deviceId: string): Promise<string> => {
    try {
        const response = await createNewRoomRequest(deviceId);
        const roomcode: any = await response.json();
        console.log(roomcode)
        return roomcode;
    } catch (e) {
        console.log(e)
    }
}

export default createNewRoom;