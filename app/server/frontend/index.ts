import express, { Request, Response } from 'express';
import documentProvider from './documentProvider';
import { CREATE_ROOM_ROUTE, VALIDATE_ROOM_ROUTE } from './constants';
import { createRoom, validateRoom } from '../game/SocketServer';

const router = express.Router();

router.post(CREATE_ROOM_ROUTE, async (req: Request, res: Response) => {
    const { deviceId } = req.body;

    // request new room ( pending audit etc )
    const room = await createRoom(deviceId);

    // return newly created room code
    res.status(201).send(JSON.stringify(room.getId()));
});

router.post(VALIDATE_ROOM_ROUTE, async (req: Request, res: Response) => {
    const { deviceId, roomCode } = req.body;

    // validate room code against room collection;
    if (validateRoom(deviceId, roomCode)) {
        res.status(200).send(JSON.stringify(roomCode));
    } else {
        res.status(404).send(JSON.stringify(roomCode));
    }
});

router.get('*', (req: Request, res: Response) => {
    res.send(documentProvider());
});

export default router;
