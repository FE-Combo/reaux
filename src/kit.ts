// ref: https://github.com/vocoWone/core-kit

export function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;
