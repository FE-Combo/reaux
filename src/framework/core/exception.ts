import {ErrorHandler} from "./type";

export abstract class Exception {
    protected constructor(public message: string) {}
}

// e.g: 4**
export class APIException extends Exception {
    constructor(message: string, public statusCode: number, public requestURL: string, public responseData: any) {
        super(message);
    }
}

export class RuntimeException extends Exception {
    constructor(message: string, public error: Error | null = null) {
        super(message);
    }
}

export class ReactLifecycleException extends Exception {
    constructor(public message: string, public stack: string | null, public componentStack: string) {
        super(message);
    }
}

export interface ErrorListener {
    onError: ErrorHandler;
}
