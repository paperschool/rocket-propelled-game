import { Reducer } from 'react';

export const CHECK_IDLE = 'CHECK_IDLE';

const idleContextMiddleware = (
    reducer: Reducer<any, any>,
    idleTimeout: number,
    log: boolean,
    storeName?: string
): Reducer<any, any> => {
    return (state: any, { type, payload }: any): Reducer<any, any> => {
        if (type === CHECK_IDLE) {
            return {
                ...state,
                idle: Date.now() - state.lastAction > idleTimeout,
            };
        }

        if (log) {
            console.log(`${storeName} - `, type);
        }

        const newState = {
            ...state,
            lastAction: Date.now(),
            idle: false,
        };

        return reducer(newState, { type, payload });
    };
};

export default idleContextMiddleware;
