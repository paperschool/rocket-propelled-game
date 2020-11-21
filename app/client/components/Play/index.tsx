import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router';
import SocketClient from "./SocketClient";
import PageTemplate from "../PageTemplate";
import Canvas from "../Canvas";
import Dashboard from "./Dashboard";

import gameStore from "../../state/GameStore/store";
import { resetState } from "../../state/GameStore/actions";
import { getRoomCodeValidity, getRoomCodeValidated, getRoomCode } from "../../state/GameStore/selectors";
import { controlContainer } from "./index.scss";

const Play: FunctionComponent = () => {

    const { state, dispatch } = useContext(gameStore);

    const location = useLocation()

    useEffect(() => {
        resetState(dispatch);
    }, [location])

    return <PageTemplate>
        <SocketClient />
        <Canvas />
        <div className={controlContainer}>
            <Dashboard />
        </div>

    </PageTemplate>
}

export default Play;