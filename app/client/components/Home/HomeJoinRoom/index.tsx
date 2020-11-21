import React, { FunctionComponent, useState, useEffect, useContext } from "react";

import Input, { InputTypes } from "../../Input";
import Button, { ButtonTypes } from "../../Button";
import SmallHeader from "../../SmallHeader";
import validateRoomCodeInput from "./validateRoomCodeInput";
import validateRoomCodeRequest from "./validateRoomCodeRequest";

import { setRoomCode, setRoomCodeValidity } from "../../../state/GameStore/actions";
import { getDeviceId } from "../../../state/GameStore/selectors";
import gameStore from "../../../state/GameStore/store";

import {
    homeRoomCodeInput
} from "./index.scss";


const HomeJoinRoom: FunctionComponent = () => {

    const { state, dispatch } = useContext(gameStore);

    const [newRoomCode, setNewRoomCode] = useState("")
    const [joinEnabled, setJoinEnabled] = useState(false)
    const [validatingRoomCode, setValidatingRoomCode] = useState(false);
    const [roomCodeFormatValid, setRoomCodeFormatValid] = useState(true);

    useEffect(() => {
        setRoomCodeFormatValid(true);
        if (validateRoomCodeInput(newRoomCode) && !validatingRoomCode) {
            setJoinEnabled(true);
        } else {
            setJoinEnabled(false);
        }
    }, [newRoomCode, validateRoomCodeInput])

    return (<div className={homeRoomCodeInput}>
        <SmallHeader
            heading={"Enter Room Code"}
            subHeading={"Enter a Room Code if you have one!"}
        />
        <Input
            onChange={input => {
                setNewRoomCode(input)
            }}
            placeholder={"ABCD-1234"}
            type={roomCodeFormatValid ? InputTypes.Default : InputTypes.Invalid}
        />
        <Button
            onClick={async () => {
                setValidatingRoomCode(true);
                const serverValidatedRoomCode: any = await validateRoomCodeRequest(getDeviceId(state), newRoomCode);
                if (serverValidatedRoomCode) {
                    setRoomCode(dispatch, serverValidatedRoomCode);
                    setRoomCodeFormatValid(true);
                    setRoomCodeValidity(dispatch, true);
                } else {
                    setRoomCodeFormatValid(false);
                }
                setValidatingRoomCode(false);
            }}
            enabled={joinEnabled}
            text={"Join"}
            type={roomCodeFormatValid ? ButtonTypes.Default : ButtonTypes.Invalid}
        />
        {!roomCodeFormatValid && <p>Room Code Invalid...</p>}
    </div>)
}

export default HomeJoinRoom;