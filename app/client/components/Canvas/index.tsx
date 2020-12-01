import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import Sketch from 'react-p5';
import gameStore from '../../state/GameStore/store';
import { getMap } from '../../state/GameStore/selectors';
import { Animation } from './Animation';

import { canvasContainer } from './index.scss';

const Canvas: FunctionComponent = () => {
    const { state } = useContext(gameStore);
    const [animation, setAnimation] = useState(undefined);

    useEffect(() => {
        if (!animation) {
            setAnimation(new Animation());
        }

        // eslint-disable-next-line
        return () => {};
    }, []);

    useEffect(() => {
        if (animation) {
            animation.refreshData(getMap(state));
        }
    }, [getMap(state)]);

    return (
        <div className={canvasContainer}>
            {animation ? (
                <Sketch
                    setup={animation.setup.bind(animation)}
                    draw={animation.draw.bind(animation)}
                    windowResized={animation.resize.bind(animation)}
                />
            ) : null}
        </div>
    );
};

export default Canvas;
