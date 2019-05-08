import {call as sagaCall, CallEffect} from "redux-saga/effects";

interface CallWithResultEffect<R> extends CallEffect {
    result: () => R;
}

export const call = <R, P extends any[]>(fn: (...args: P) => Promise<R>, ...args: P) => {
    let result: R;
    // Same as fn (parameter), but store its promised return into "result"
    const wrappedFn = (...args: P) => {
        return fn(...args).then(_ => {
            result = _;
            return _;
        });
    };
    const effect = sagaCall.apply(null, [wrappedFn, ...args] as any) as CallWithResultEffect<R>;
    effect.result = () => {
        if (result === undefined) {
            throw new Error("Effect has not been yielded");
        }
        return result;
    };
    return effect;
};
