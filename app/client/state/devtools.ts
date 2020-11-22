let id = 0;

type SubscriptionData = {
    type: string;
    payload: any;
    state: any;
};

const DevTools = ({ initialState }: any, self: any) => {
    const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

    const instanceID = id;
    id += 1;

    const name = `stax - ${instanceID}`;
    const features = {
        jump: true,
    };

    const devTools = reduxDevTools.connect({ name, features });

    devTools.subscribe((data: SubscriptionData) => {
        switch (data.type) {
            case 'START':
                devTools.init(initialState);
                break;
            case 'RESET':
                self.setState(initialState);
                break;
            case 'DISPATCH':
                switch (data.payload.type) {
                    case 'JUMP_TO_STATE':
                    case 'JUMP_TO_ACTION': {
                        self.setState(JSON.parse(data.state));
                        break;
                    }
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });

    return (action: string, ...arg: any) => {
        devTools.send({ type: action, ...arg }, self.state, {}, instanceID);
    };
};

export default DevTools;
