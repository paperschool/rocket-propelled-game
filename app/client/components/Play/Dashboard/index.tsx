import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import Acordian from "../../Acordian";

import {
    dashboard,
    dashboardHeader
} from "./index.scss";

// import gameStore from "../../state/GameStore/store";
// import { resetState } from "../../state/GameStore/actions";
// import { getRoomCodeValidity, getRoomCodeValidated, getRoomCode } from "../../state/GameStore/selectors";

const Dashboard: FunctionComponent = () => {

    // const { state, dispatch } = useContext(gameStore);

    // const location = useLocation()

    // useEffect(() => {
    //     resetState(dispatch);
    // }, [location])

    return <Acordian
        title={"Rocket Controls"}
    >
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
        <p>dashboard content</p>
    </Acordian>
}

export default Dashboard;