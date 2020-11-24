import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import SocketClient from './SocketClient';
import PageTemplate from '../PageTemplate';
import Canvas from '../Canvas';
import Dashboard from './Dashboard';
import ReadyButton from './ReadyButton';

import gameStore from '../../state/GameStore/store';
import { resetState } from '../../state/GameStore/actions';
import { controlContainer } from './index.scss';

const Play: FunctionComponent = () => {
    const { dispatch } = useContext(gameStore);

    const location = useLocation();

    useEffect(() => {
        resetState(dispatch);
    }, [location]);

    return (
        <PageTemplate>
            <SocketClient />
            <Canvas />
            <ReadyButton />
            <div className={controlContainer}>
                <Dashboard />
            </div>
        </PageTemplate>
    );
};

export default Play;
