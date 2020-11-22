export type Message = {
    deviceId: string;
    roomCode: string;
    timeSent: number;
    payload: any;
};

export const validateMessage = (message: any, optionalPayload = false): boolean => {
    return [
        typeof message.deviceId === 'string',
        typeof message.roomCode === 'string',
        message.timeSent < Date.now(),
        typeof message.payload === 'object',
        Object.keys(message.payload).length !== 0 || optionalPayload,
    ].reduce((validity: boolean, propertyValidity: boolean) => validity && propertyValidity, true);
};
