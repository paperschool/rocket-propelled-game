import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import constructValidMessage from "./constructValidMessage";

import gameStore from "../../../state/GameStore/store";
import {
    getDeviceId,
    getRoomCode,
    isSocketConnected
} from "../../../state/GameStore/selectors";


import {
    REFRESH_DATA,
    ROOM_INVALID,
    ROOM_VALID,
    CONNECT_CLIENT,
    DISCONNECT_CLIENT,
    // DETATCH_CLIENT,
    SPAM_WARN_CLIENT
} from "../../../../server/game/constants";
import { resetState, setSocketConnected } from "../../../state/GameStore/actions";

const SocketClient: FunctionComponent = () => {

    const { state, dispatch } = useContext(gameStore);

    const [clientReadyToSetup, setClientReadyToSetup] = useState(false);
    const [socket, setSocket] = useState(undefined);
    const [isBadRoom, setIsBadRoom] = useState(undefined);
    const [refreshData, setRefreshData] = useState(undefined);

    useEffect(() => {
        if (getDeviceId(state)) {
            if (getRoomCode(state)) {
                setClientReadyToSetup(true);
            } else {
                setIsBadRoom(true);
            }
        }
    }, [getDeviceId(state), getRoomCode(state)])

    useEffect(() => {

        const newSocket = io.connect();

        // newSocket.on(DISCONNECT_CLIENT, () => {
        //     // resetState(dispatch)
        //     window.location.href = "/"
        // })

        newSocket.on(ROOM_INVALID, () => {
            setIsBadRoom(true)
        })

        newSocket.on(ROOM_VALID, () => {
            setIsBadRoom(false)
            setSocketConnected(dispatch);
        })

        newSocket.on(REFRESH_DATA, (refreshData: any) => setRefreshData(refreshData))

        // newSocket.on(SPAM_WARN_CLIENT, (error: any) => {
        //     console.log("Spam Warn Called");
        // })

        newSocket.emit(CONNECT_CLIENT,
            constructValidMessage(getDeviceId(state), getRoomCode(state), {})
        );

        setSocket(newSocket);

    }, [clientReadyToSetup])

    useEffect(() => {
        return () => {
            if (isSocketConnected(state)) {
                socket.emit(DISCONNECT_CLIENT,
                    constructValidMessage(getDeviceId(state), getRoomCode(state), {})
                );
            }
        }
    }, [isSocketConnected(state)])

    useEffect(() => {
        if (typeof isBadRoom !== "undefined") {
            if (isBadRoom) {
                resetState(dispatch)
                window.location.href = "/"
            }
        }
    }, [isBadRoom])

    useEffect(() => {
        if (refreshData) {
            console.log(refreshData)
            // storeData(dispatch, refreshData);
        }
    }, [refreshData])

    return (<></>)
}

export default SocketClient;