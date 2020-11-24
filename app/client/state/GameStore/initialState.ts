export default async (): Promise<any> => {
    return {
        user: {
            deviceId: undefined,
            isSocketConnected: false,
        },
        room: {
            id: undefined,
            valid: false,
            validated: false,
        },
        controller: {},
        player: {
            isReady: false,
        },
        errors: {
            player: false,
            userPremium: false,
        },
    };
};
