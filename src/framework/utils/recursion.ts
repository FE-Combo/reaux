/** 递归算法：
 * 1.不要在递归函数中返回最终结果
 * 2.两种返回值：①返回正常值，②返回函数本身
 */

interface DataType<T> {
    value: T;
    children: Array<DataType<T>>;
}
export function reArray<T>(data: Array<DataType<T>>, value: T): T[] {
    for (const item of data) {
        if (item.value === value) {
            return [value];
        } else if (item.children) {
            const result = [item.value, ...reArray(item.children, value)];
            if (result.includes(value)) {
                return result;
            }
        }
    }
    return [];
}

/**
 * 改变数组中的值：
 * const [{value:1, children:[{value:1}]}] = changeArray([{a:1}],(_)=>({b:a, a})
 *
 */

export function changArray<T extends object, V>(data: T[], fn: (value: T) => V): V[] {
    return data.map((_: T) => fn(_));
}
