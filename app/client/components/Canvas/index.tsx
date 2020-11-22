import React, { FunctionComponent, useState, useEffect } from 'react';
import Sketch from 'react-p5';
import { Animation } from './Animation';

import { canvasContainer } from './index.scss';

const Canvas: FunctionComponent = () => {
    const [animation, setAnimation] = useState(undefined);

    useEffect(() => {
        if (!animation) {
            setAnimation(new Animation());
        }

        // eslint-disable-next-line
        return () => {};
    }, []);

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
