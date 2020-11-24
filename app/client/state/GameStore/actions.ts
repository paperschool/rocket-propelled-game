import {
    SET_DEVICE_ID,
    SET_ROOM_CODE,
    SET_ROOM_CODE_VALIDITY,
    // STORE_DATA,
    SET_SOCKET_CONNECTED,
    SET_PLAYER_READINESS,
    RESET_STATE,
    LEAVE_ROOM,
} from './constants';

export const setDeviceId = (dispatch: any, deviceId: string) => {
    dispatch({ type: SET_DEVICE_ID, payload: deviceId });
};

export const setRoomCode = (dispatch: any, roomCode: string) => {
    dispatch({ type: SET_ROOM_CODE, payload: roomCode });
};

export const setRoomCodeValidity = (dispatch: any, roomCodeValidity: boolean) => {
    dispatch({ type: SET_ROOM_CODE_VALIDITY, payload: roomCodeValidity });
};

export const setSocketConnected = (dispatch: any) => {
    dispatch({ type: SET_SOCKET_CONNECTED });
};

// room stuff

export const leaveRoom = (dispatch: any) => {
    dispatch({ type: LEAVE_ROOM });
};

// player stuff

export const setPlayerReady = (dispatch: any, playerReadiness: boolean) => {
    dispatch({ type: SET_PLAYER_READINESS, payload: playerReadiness });
};

// errors

// state reset
export const resetState = (dispatch: any) => {
    dispatch({ type: RESET_STATE });
};
