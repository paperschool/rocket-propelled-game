import { Message } from '../../../../server/game/Message';

const constructValidMessage = (deviceId: string, roomCode: string, payload: any): Message => ({
    deviceId,
    roomCode,
    timeSent: Date.now(),
    payload,
});

export default constructValidMessage;
