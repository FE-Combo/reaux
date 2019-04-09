import {ErrorHandler} from "../type";

export abstract class Exception {
    protected constructor(public message: string) {}
}

// 请求返回错误 e.g: 3**/4**/5**
export class APIException extends Exception {
    constructor(message: string, public statusCode: number, public requestURL: string, public responseData: any) {
        super(message);
    }
}

// action error
export class RuntimeException extends Exception {
    constructor(message: string, public error: Error | null = null) {
        super(message);
    }
}

// ErrorBoundary
export class ReactLifecycleException extends Exception {
    constructor(public message: string, public componentStack: string) {
        super(message);
    }
}

// 请求超时
export class NetworkConnectionException extends Exception {
    constructor(requestURL: string) {
        super(`failed to connect to ${requestURL}`);
    }
}

export interface ErrorListener {
    onError: ErrorHandler;
}
