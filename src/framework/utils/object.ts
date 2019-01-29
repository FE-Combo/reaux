export function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.keys(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}

export function isEmptyObject(object: object) {
    return Object.keys(object).length === 0;
}

export function objectToArray<T extends object, V>(object: T, callback: (key: keyof T & string, value: T[keyof T]) => V): V[] {
    const result: V[] = [];
    Object.keys(object).forEach(key => result.push(callback(key as keyof T & string, object[key])));
    return result;
}
