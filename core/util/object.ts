export function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.keys(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}
