export class ComparativeError extends Error {

    isOfName: (errorName: string) => boolean;
    isOfType: (errorName: ErrorConstructor) => boolean;

    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "Comparative Error";

        this.isOfName = (errorName: string) => {
            return errorName === this.name;
        }

        this.isOfType = (error: ErrorConstructor) => {
            return this instanceof error;
        }

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export class NotFoundError extends ComparativeError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "Not Found Error";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export class ServerError extends ComparativeError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "Server Error";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export class TimeoutError extends ComparativeError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "Timeout Error";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export class UnauthorisedError extends ComparativeError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = "Unauthorised Error";
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}