import { Maybe, none } from './maybe';
export function first<T>(variants: Maybe<T>[]): Maybe<T> {
    for (const variant of variants) {
        if (!variant.isNone()) {
            return variant;
        }
    }
    return none;
}
