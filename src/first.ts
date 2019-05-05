import { Maybe, none } from './maybe';
export function first<T>(variants: Maybe<T>[]): Maybe<T> {
    return variants.find(variant => !variant.isNone()) || none;
}
