import { validateRoomCode as validateRoomCodeRequest } from "../../../services/game"
import { RoomNotFound } from "../../../services/game/errors";

const validateRoomCode = async (deviceId: string, roomCode: string): Promise<string | boolean> => {

    try {
        const response = await validateRoomCodeRequest(deviceId, roomCode);
        const validRoomCode: any = await response.json();
        return validRoomCode;
    } catch (e) {
        if (e.isOfType(RoomNotFound)) {
            console.log("Room Not Found Error!")
            return false;
        } else {
            console.log("Other Error...")
            console.log(e)
        }
    }
}

export default validateRoomCode;