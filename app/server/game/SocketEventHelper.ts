import Socket from 'socket.io';
import { validateMessage, Message } from './Message';

const SocketEventHelper = (
    socket: Socket.Socket,
    messageType: string,
    optionalPayload: boolean,
    handler: (validatedMessage: Message) => void
) => {
    socket.on(messageType, (messagePayload: any) => {
        if (validateMessage(messagePayload, optionalPayload)) {
            handler(messagePayload);
        }
    });
};

export default SocketEventHelper;
