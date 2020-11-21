import React, { FunctionComponent, useEffect, useContext } from "react";
import PageTemplate from "../PageTemplate";
import HomeRoomCodeInput from "./HomeJoinRoom";
import HomeCreateRoom from "./HomeCreateRoom";

import { getDeviceId, getRoomCode, getRoomCodeValidity } from "../../state/GameStore/selectors";
import gameStore from "../../state/GameStore/store";

import {
    roomControlsContainer,
    controlDivider
} from "./index.scss";


const Home: FunctionComponent = () => {

    const { state, dispatch } = useContext(gameStore);

    useEffect(() => {

        if (getDeviceId(state) && getRoomCode(state) && getRoomCodeValidity(state)) {
            window.location.href = "/play"
        }
    }, [getRoomCode(state), getDeviceId(state), getRoomCodeValidity(state)])

    return <PageTemplate>
        <div className={roomControlsContainer}>
            <HomeRoomCodeInput />
            <div className={controlDivider}></div>
            <HomeCreateRoom />
        </div>
    </PageTemplate>

}

export default Home;