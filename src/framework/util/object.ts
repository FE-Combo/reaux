export function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.keys(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}

export function isEmptyObject(object: object) {
    return Object.keys(object).length === 0;
}

// {key1:value1,key2:value2} => [{key1,value1},{key2:value2}]
export function objectToArray<T extends object, V>(object: T, callback: (key: keyof T & string, value: T[keyof T]) => V): V[] {
    const result: V[] = [];
    Object.keys(object).forEach(key => result.push(callback(key as keyof T & string, object[key])));
    return result;
}

export function mapEnumToArray<EnumType>(enumMap: EnumType): Array<EnumType[keyof EnumType]> {
    const result: Array<EnumType[keyof EnumType]> = [];
    Object.values(enumMap).forEach((key: EnumType[keyof EnumType]) => result.push(key));
    return result;
}
