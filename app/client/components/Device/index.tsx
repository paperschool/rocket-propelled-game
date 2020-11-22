import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 } from 'uuid';
import validateRoomCodeRequest from './validateRoomCodeRequest';
import { COOKIE_DEVICE_ID, COOKIE_GAME_DETAILS, COOKIE_ROOM_CODE } from '../constants';

import { getDeviceId, getRoomCode } from '../../state/GameStore/selectors';

import { setDeviceId, setRoomCode, setRoomCodeValidity } from '../../state/GameStore/actions';

import gameStore from '../../state/GameStore/store';

const Device: FunctionComponent = () => {
    const { state, dispatch } = useContext(gameStore);

    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_GAME_DETAILS]);

    useEffect(() => {
        const existingDeviceId = cookies[COOKIE_DEVICE_ID];
        const existingRoomCode = cookies[COOKIE_ROOM_CODE];

        // read and store room code
        if (!existingDeviceId) {
            const newDeviceId = `device-id-${v4()}`;
            setCookie(COOKIE_DEVICE_ID, newDeviceId);
            setDeviceId(dispatch, newDeviceId);
        } else {
            setDeviceId(dispatch, existingDeviceId);
        }

        if (existingRoomCode) {
            setRoomCode(dispatch, existingRoomCode);
        }
    }, []);

    useEffect(() => {
        // read and store device id
        if (getDeviceId(state) && getRoomCode(state)) {
            (async () => {
                const validRoomCode: any = await validateRoomCodeRequest(getDeviceId(state), getRoomCode(state));
                if (validRoomCode) {
                    setRoomCode(dispatch, validRoomCode);
                    setRoomCodeValidity(dispatch, true);
                    setCookie(COOKIE_ROOM_CODE, validRoomCode);
                } else {
                    setRoomCode(dispatch, undefined);
                    setRoomCodeValidity(dispatch, true);
                    removeCookie(COOKIE_ROOM_CODE);
                }
            })();
        }
    }, [getDeviceId(state), getRoomCode(state)]);

    return <></>;
};

export default Device;
