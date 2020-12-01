import { Reducer } from 'react';

import {
    SET_DEVICE_ID,
    STORE_DATA,
    SET_SOCKET_CONNECTED,
    RESET_STATE,
    SET_ROOM_CODE,
    SET_ROOM_CODE_VALIDITY,
    LEAVE_ROOM,
    SET_PLAYER_READINESS,
    SET_SERVER_GAME_DATA,
    // SET_NOTIFICATION,
    // REMOVE_NOTIFICATION
} from './constants';

const GameStoreReducer: Reducer<any, any> = (state: any, { type, payload }: any): any => {
    switch (type) {
        case SET_SOCKET_CONNECTED:
            return {
                ...state,
                user: {
                    ...state.user,
                    isSocketConnected: true,
                },
            };
        case SET_DEVICE_ID:
            return {
                ...state,
                user: {
                    ...state.user,
                    deviceId: payload,
                },
            };
        case SET_ROOM_CODE:
            return {
                ...state,
                room: {
                    ...state.room,
                    id: payload,
                },
            };
        case SET_ROOM_CODE_VALIDITY:
            return {
                ...state,
                room: {
                    ...state.room,
                    valid: payload,
                    validated: true,
                },
            };
        case SET_PLAYER_READINESS: {
            return {
                ...state,
                player: {
                    ...state.player,
                    isReady: payload,
                },
            };
        }
        case STORE_DATA:
            return {
                ...state,
            };
        case LEAVE_ROOM:
            return {
                ...state,
                room: {
                    ...state.room,
                    id: undefined,
                    valid: false,
                    validated: false,
                },
            };
        case RESET_STATE:
            return {
                ...state,
                user: {
                    ...state.user,
                    isSocketConnected: false,
                },
                errors: {
                    ...state.errors,
                },
            };
        case SET_SERVER_GAME_DATA:
            return {
                ...state,
                serverData: {
                    ...payload,
                },
            };
        default:
            return state;
    }
};

export default GameStoreReducer;
