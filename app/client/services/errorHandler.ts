import environmentProvider from '../environmentProvider';

import { NotFoundError, ServerError, TimeoutError, UnauthorisedError } from './errors';

type AdditionalErrorHandling = (response: any) => Promise<boolean>;

const errorHandler = async (request: Promise<any>, additionalErrorHandling?: AdditionalErrorHandling): Promise<any> => {
    const { CLIENT_REQUEST_TIMEOUT } = environmentProvider();

    const response: any = await Promise.race([
        new Promise((res) =>
            setTimeout(() => {
                res({ status: -1, timeout: true });
            }, CLIENT_REQUEST_TIMEOUT)
        ),
        request,
    ]);

    let additionalErrorHandlingResult;

    if (additionalErrorHandling) {
        additionalErrorHandlingResult = await additionalErrorHandling(response);
    }

    if (additionalErrorHandling && additionalErrorHandlingResult) {
        return additionalErrorHandlingResult;
    }

    if (response.status > 199 && response.status < 399) {
        return response;
    } else if (response.status === 401) {
        throw new UnauthorisedError();
    } else if (response.status === 404) {
        throw new NotFoundError();
    } else if (response.status >= 500) {
        throw new ServerError();
    } else if (response.timeout) {
        throw new TimeoutError();
    } else {
        throw new Error('Undefined Error Classification...');
    }
};

export default errorHandler;
