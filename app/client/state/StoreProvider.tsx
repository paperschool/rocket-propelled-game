import React, { FunctionComponent, useState, useReducer, Reducer, useEffect } from "react";
import ContextDevTool from 'react-context-devtool';
import idleTrackingMiddleware, { CHECK_IDLE } from "./idleContextMiddleware";

type StoreProviderProps = {
    id: string;
    displayName: string;
    store: any;
    initialState: any;
    reducer: Reducer<any, any>;
    enableDevTool?: boolean;
    idleTracking?: boolean;
    idleTrackingTimeout?: number;
}

export const StoreProvider: FunctionComponent<StoreProviderProps> = ({
    children,
    id,
    displayName,
    store: Store,
    initialState,
    reducer,
    enableDevTool = true,
    idleTracking = false,
    idleTrackingTimeout = 5000
}) => {

    let modifiedReducer = reducer;

    if (idleTracking) {
        modifiedReducer = idleTrackingMiddleware(reducer, idleTrackingTimeout, false, displayName)
    }

    const [state, dispatch] = useReducer(modifiedReducer, initialState)

    useEffect(() => {
        let idleCheckInterval = setInterval(() => {
            dispatch({ type: CHECK_IDLE })
        }, 1000);

        return () => {
            clearInterval(idleCheckInterval)
        }
    }, [])

    Store.displayName = displayName;

    return (<Store.Provider value={{ state, dispatch }}>
        {enableDevTool ? <ContextDevTool
            context={Store}
            id={id}
            displayName={displayName} /> : null}
        {children}
    </Store.Provider>);
}

export default StoreProvider;