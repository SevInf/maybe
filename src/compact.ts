import { Maybe } from './maybe';
export function compact<T>(items: Maybe<T>[]): T[] {
    const result = [] as T[];
    for (const item of items) {
        const unpacked = item.orNull();
        if (unpacked !== null) {
            result.push(unpacked);
        }
    }
    return result;
}
