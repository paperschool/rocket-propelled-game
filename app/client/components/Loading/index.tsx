import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import { loading, loaderSmall, loaderLarge } from './index.scss';

export enum LoadingTypes {
    Small,
    Large,
}

type LoadingProps = {
    loaded: boolean;
    size?: LoadingTypes;
};

export const Loading: FunctionComponent<LoadingProps> = ({ children, loaded, size = LoadingTypes.Large }) => {
    return (
        <>
            {loaded ? (
                children
            ) : (
                <div className={classnames(loading)}>
                    <div
                        className={classnames({
                            [loaderSmall]: size === LoadingTypes.Small,
                            [loaderLarge]: size === LoadingTypes.Large,
                        })}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;
