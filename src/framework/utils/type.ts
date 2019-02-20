// Use at defaultProps, 获取接口中的可选字段
/**
 * interface A {
 *    a?: string;
 *    b: number;
 * }
 * type a = PickOptional<A>;
 * a = {
 *    a?: string | undefined;
 * }
 */
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

/** Usage: 去除接口中指定字段
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
 * // TODO: value类型不准确，不能一一对应每个 key 的 value 类型，当前任意 key 的 value 类型为 number | string
 */
export function typeObject<T extends {}>(object: T): Record<keyof T, T[keyof T]> {
    const safeObject = {};
    Object.keys(object).forEach(_ => (safeObject[_] = object[_]));
    return safeObject as Record<keyof T, T[keyof T]>;
}
