import { ComparativeError } from '../errors';

export class RoomNotFound extends ComparativeError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = 'Room Not Found Error';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
