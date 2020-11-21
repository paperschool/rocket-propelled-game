import React, { FunctionComponent, useEffect, useState, } from "react";
import reducer from "./reducer";
import initialState from "./initialState";
import store from "./store";

import StoreProvider from "../StoreProvider";

export const GameStoreProvider: FunctionComponent = ({ children }) => {

    const [initialStateResolved, setInitialStateResolved] = useState(undefined);
    useEffect(() => {
        (async () => {
            const state = await initialState()
            setInitialStateResolved(state)
        })()
    }, [])


    return initialStateResolved
        ? <StoreProvider
            id={"some-game-store-id"}
            displayName={"Game Store"}
            reducer={reducer}
            initialState={initialStateResolved}
            store={store}
            idleTracking={true}
        >
            {children}
        </StoreProvider>
        : null
}

export default GameStoreProvider;