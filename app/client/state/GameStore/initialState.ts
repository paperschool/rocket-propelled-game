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
        errors: {
            player: false,
            userPremium: false,
        },
    };
};
