import { Maybe, none, some } from './maybe';

function all<T1>(maybies: [Maybe<T1>]): Maybe<[T1]>;
function all<T1, T2>(maybies: [Maybe<T1>, Maybe<T2>]): Maybe<[T1, T2]>;
function all<T1, T2, T3>(
    maybies: [Maybe<T1>, Maybe<T2>, Maybe<T3>]
): Maybe<[T1, T2, T3]>;
function all<T1, T2, T3, T4>(
    maybies: [Maybe<T1>, Maybe<T2>, Maybe<T3>, Maybe<T4>]
): Maybe<[T1, T2, T3, T4]>;
function all<T1, T2, T3, T4, T5>(
    maybies: [Maybe<T1>, Maybe<T2>, Maybe<T3>, Maybe<T4>, Maybe<T5>]
): Maybe<[T1, T2, T3, T4, T5]>;
function all<T1, T2, T3, T4, T5, T6>(
    maybies: [Maybe<T1>, Maybe<T2>, Maybe<T3>, Maybe<T4>, Maybe<T5>, Maybe<T6>]
): Maybe<[T1, T2, T3, T4, T5, T6]>;
function all<T1, T2, T3, T4, T5, T6, T7>(
    maybies: [
        Maybe<T1>,
        Maybe<T2>,
        Maybe<T3>,
        Maybe<T4>,
        Maybe<T5>,
        Maybe<T6>,
        Maybe<T7>
    ]
): Maybe<[T1, T2, T3, T4, T5, T6, T7]>;
function all<T1, T2, T3, T4, T5, T6, T7, T8>(
    maybies: [
        Maybe<T1>,
        Maybe<T2>,
        Maybe<T3>,
        Maybe<T4>,
        Maybe<T5>,
        Maybe<T6>,
        Maybe<T7>,
        Maybe<T8>
    ]
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8]>;
function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    maybies: [
        Maybe<T1>,
        Maybe<T2>,
        Maybe<T3>,
        Maybe<T4>,
        Maybe<T5>,
        Maybe<T6>,
        Maybe<T7>,
        Maybe<T8>,
        Maybe<T9>
    ]
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    maybies: [
        Maybe<T1>,
        Maybe<T2>,
        Maybe<T3>,
        Maybe<T4>,
        Maybe<T5>,
        Maybe<T6>,
        Maybe<T7>,
        Maybe<T8>,
        Maybe<T9>,
        Maybe<T10>
    ]
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
function all<T>(maybies: Array<Maybe<T>>): Maybe<T[]>;
function all(maybies: Array<Maybe<unknown>>): Maybe<unknown[]> {
    const result: unknown[] = [];
    for (const item of maybies) {
        if (item.isNone()) {
            return none;
        }
        result.push(item.orThrow());
    }
    return some(result);
}

export { all };
