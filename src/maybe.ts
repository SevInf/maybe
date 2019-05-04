type Required<T> = Exclude<T, null | undefined>;
type RemoveMaybe<T> = T extends Maybe<infer Inner> ? Inner : T;
type MaybeOnce<T> = Maybe<RemoveMaybe<T>>;
type MapCallback<T, U> = (arg: Required<T>) => U;

export interface Maybe<T> {
    isNone(): boolean;

    orElse(fallback: Required<T>): Required<T>;
    orCall(getFallback: () => Required<T>): Required<T>;
    orNull(): Required<T> | null;
    orThrow(message?: string): Required<T>;

    map<U>(f: MapCallback<T, U>): MaybeOnce<U>;
    get<K extends keyof Required<T>>(key: K): MaybeOnce<Required<T>[K]>;
}

const none: Maybe<any> = {
    isNone() {
        return true;
    },

    orElse(fallback: Required<any>): Required<any> {
        return fallback;
    },

    orCall(getFallback: () => Required<any>): Required<any> {
        return getFallback();
    },

    orNull() {
        return null;
    },

    orThrow(message = 'Unexpected null value'): never {
        throw new TypeError(message);
    },

    map<U>(): MaybeOnce<U> {
        return none;
    },

    get(): MaybeOnce<any> {
        return none;
    }
};

class Some<T> implements Maybe<T> {
    constructor(private readonly value: Required<T>) {}

    isNone(): boolean {
        return false;
    }

    orElse(): Required<T> {
        return this.value;
    }

    orCall(): Required<T> {
        return this.value;
    }

    orNull(): Required<T> | null {
        return this.value;
    }

    orThrow(): Required<T> {
        return this.value;
    }

    map<U>(f: MapCallback<T, U>): MaybeOnce<U> {
        return maybe(f(this.value));
    }

    get<K extends keyof Required<T>>(key: K): MaybeOnce<Required<T>[K]> {
        return this.map(obj => obj[key]);
    }
}

export function isMaybe(value: unknown): value is MaybeOnce<any> {
    return value === none || value instanceof Some;
}

export function maybe<T>(value: T | null | undefined): MaybeOnce<T> {
    if (isMaybe(value)) {
        return value;
    }
    if (value == null) {
        return none;
    }

    return (new Some(value as Required<T>) as Maybe<T>) as MaybeOnce<T>;
}
