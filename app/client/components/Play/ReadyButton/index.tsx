import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Button from '../../Button';

import gameStore from '../../../state/GameStore/store';
import { setPlayerReady } from '../../../state/GameStore/actions';
import { getPlayerReady } from '../../../state/GameStore/selectors';

import { readyButton, readyButtonContainer } from './index.scss';

const ReadyButton: FunctionComponent = () => {
    const { state, dispatch } = useContext(gameStore);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setDisplay(!getPlayerReady(state));
    }, [getPlayerReady(state)]);

    return (
        display && (
            <div className={readyButtonContainer}>
                <div className={readyButton}>
                    <h1>Ready To Start?</h1>
                    <p>Don't be getting cold feet now!</p>
                    <Button
                        text={'Ready To Play'}
                        onClick={() => setPlayerReady(dispatch, true)} // start ready chain
                    />
                </div>
            </div>
        )
    );
};

export default ReadyButton;
