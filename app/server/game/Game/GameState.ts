import Game from './Game';
import GameStates from './GameStates';

type GameStateTransitionListener = {
    id: string;
    listener: () => void;
};

type GameStateTransition = {
    startState: GameStates;
    endState: GameStates;
    condition: () => boolean;
    listeners: GameStateTransitionListener[];
};
class GameState {
    private transitions: GameStateTransition[] = [];
    private state: GameStates = GameStates.Initial;

    getState(): GameStates {
        return this.state;
    }

    transitionTo(startState: GameStates, endState: GameStates): void {
        const transition = this.getTransition(startState, endState);

        if (transition && transition.condition()) {
            this.state = endState;
            transition.listeners.forEach(({ listener }) => listener());
        }
    }

    getTransitionIndex(newStartState: GameStates, newEndState: GameStates) {
        return this.transitions.findIndex(
            ({ startState, endState }) => startState === newStartState && endState === newEndState
        );
    }

    getTransition(newStartState: GameStates, newEndState: GameStates) {
        return this.transitions.find(
            ({ startState, endState }) => startState === newStartState && endState === newEndState
        );
    }

    registerTransition(startState: GameStates, endState: GameStates, condition: () => boolean) {
        if (!this.getTransition(startState, endState)) {
            this.transitions.push({
                startState,
                endState,
                condition,
                listeners: [],
            });
        }
    }

    registerListener(startState: GameStates, endState: GameStates, newId: string, newListener: () => void) {
        const transition = this.getTransition(startState, endState);

        const listenerIndex = transition.listeners.findIndex(({ id }) => id === newId);

        const transitionListener = {
            id: newId,
            listener: newListener,
        };

        if (listenerIndex === -1) {
            transition.listeners.push(transitionListener);
        } else {
            transition.listeners[listenerIndex] = transitionListener;
        }
    }

    // deregisterTransition(stateState: GameStates, endState: GameStates): void {
    //     const transitionIndex = this.getTransitionIndex(stateState, endState);

    //     if(transitionIndex !== -1){
    //         this.transitions = [
    //             this.tr
    //         ]
    //     }
    // }
}

export default GameState;
