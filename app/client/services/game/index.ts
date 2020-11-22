const baseUrl = window.location.origin;
import errorHandler from '../errorHandler';
import { RoomNotFound } from './errors';
import { CREATE_ROOM_ROUTE, VALIDATE_ROOM_ROUTE } from '../../../server/frontend/constants';

export const createNewRoom = async (deviceId: string): Promise<any> => {
    return await errorHandler(
        fetch(`${baseUrl}${CREATE_ROOM_ROUTE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId,
            }),
        })
    );
};

const validateRoomCodeErrorHandler = async (response: any): Promise<boolean> => {
    if (response.status === 404) {
        throw new RoomNotFound();
    }

    return false;
};

export const validateRoomCode = async (deviceId: string, roomCode: string): Promise<any> => {
    return await errorHandler(
        fetch(`${baseUrl}${VALIDATE_ROOM_ROUTE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId,
                roomCode,
            }),
        }),
        validateRoomCodeErrorHandler
    );
};
