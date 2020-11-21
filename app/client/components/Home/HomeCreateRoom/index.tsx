import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import Button from "../../Button";
import SmallHeader from "../../SmallHeader";
import newRoomCodeRequest from "./newRoomCodeRequest"

import gameStore from "../../../state/GameStore/store";
import {
    setRoomCode
} from "../../../state/GameStore/actions";

import {
    homeRoomCodeInput
} from "./index.scss";
import { getDeviceId } from "../../../state/GameStore/selectors";

const HomeCreateRoom: FunctionComponent = () => {

    const { state, dispatch } = useContext(gameStore);

    const [roomCode, setNewRoomCode] = useState("")
    const [requestingRoomCode, setRequestingRoomCode] = useState(false)

    useEffect(() => {

        if (roomCode) {
            setRoomCode(dispatch, roomCode);
        }

    }, [roomCode])

    return (<div className={homeRoomCodeInput}>
        <SmallHeader
            heading={"Create Room"}
            subHeading={"Click below to create a room!"}
        />
        <Button
            onClick={async () => {
                setRequestingRoomCode(true)
                const newRoomCode = await newRoomCodeRequest(getDeviceId(state));
                setRequestingRoomCode(false)
                setNewRoomCode(newRoomCode);
            }}
            enabled={!requestingRoomCode}
            text={"Create Room"}
        />
    </div>)
}

export default HomeCreateRoom;