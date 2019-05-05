import { Maybe, RemoveMaybe, Defined, none, maybe, some } from './maybe';

type UnwrapMaybeProperties<T extends {}> = {
    [K in keyof T]: Defined<RemoveMaybe<T[K]>>
};

export function allProperties<T extends {}>(
    object: T
): Maybe<UnwrapMaybeProperties<T>> {
    const result: UnwrapMaybeProperties<T> = {} as UnwrapMaybeProperties<T>;
    const keys = Object.keys(object) as (keyof T)[];

    for (const key of keys) {
        const value = maybe(object[key]);
        if (value.isNone()) {
            return none;
        }
        result[key] = value.orThrow();
    }
    return some(result);
}
