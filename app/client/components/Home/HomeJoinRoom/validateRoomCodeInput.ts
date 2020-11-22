const validateRoomCodeInput = (roomCode: string): boolean => {
    return [roomCode.length === 9, /^[A-Z0-9]{4}\-[A-Z0-9]{4}$/g.test(roomCode)].reduce(
        (validity: boolean, tests: boolean) => tests && validity,
        true
    );
};

export default validateRoomCodeInput;
