import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import gameStore from "../../state/GameStore/store"
import { getRoomCode } from "../../state/GameStore/selectors"
import { leaveRoom } from "../../state/GameStore/actions"
import { COOKIE_GAME_DETAILS, COOKIE_ROOM_CODE } from "../constants";

import {
    roomCode,
    roomExit,
    roomCodeContainer
} from "./index.scss";
import { useCookies } from "react-cookie";

const RoomCode: FunctionComponent = () => {
    const { state, dispatch } = useContext(gameStore);

    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_GAME_DETAILS])
    const [exit, setExit] = useState(false);

    useEffect(() => {
        if (exit) {
            removeCookie(COOKIE_ROOM_CODE);
            leaveRoom(dispatch);
            window.location.href = "/";
        }
    }, [exit])

    return (<div className={roomCodeContainer}>
        <h4>Room Code</h4>
        <h3 className={roomCode}>{getRoomCode(state)}</h3>
        <h4 className={roomExit} onClick={() => setExit(true)}>Exit Room</h4>
    </div>)
}

export default RoomCode;