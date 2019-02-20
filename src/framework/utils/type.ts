// Use at defaultProps
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

/** Usage: 去除接口中字段
 * interface A {
 *    a: string;
 *    b: string;
 * }
 * type R = Omit<A, "a">
 * R = {
 *    b: string;
 * }
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Usage: 将 object 转换为 safe-object
 * const a = typeObject({a: 1, b: "1"});
 */
export function typeObject<T extends {}>(object: T): Record<keyof T, T[keyof T]> {
    const safeObject = {};
    Object.keys(object).forEach(_ => (safeObject[_] = object[_]));
    return safeObject as Record<keyof T, T[keyof T]>;
}
