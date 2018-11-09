export function getPrototypeOfExceptConstructor(object: Object): string[] {
    return Object.keys(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}
