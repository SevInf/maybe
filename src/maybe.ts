export type Defined<T> = Exclude<T, null | undefined>;
export type RemoveMaybe<T> = T extends Maybe<infer Inner> ? Inner : T;
type MaybeOnce<T> = Maybe<RemoveMaybe<T>>;
type MapCallback<T, U> = (arg: Defined<T>) => U;

export interface Maybe<T> {
    isNone(): boolean;

    orElse(fallback: Defined<T>): Defined<T>;
    orCall(getFallback: () => Defined<T>): Defined<T>;
    orNull(): Defined<T> | null;
    orThrow(message?: string): Defined<T>;

    map<U>(f: MapCallback<T, U>): MaybeOnce<U>;
    get<K extends keyof Defined<T>>(key: K): MaybeOnce<Defined<T>[K]>;
}

export const none: Maybe<any> = {
    isNone() {
        return true;
    },

    orElse(fallback: Defined<any>): Defined<any> {
        return fallback;
    },

    orCall(getFallback: () => Defined<any>): Defined<any> {
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
    constructor(private readonly value: Defined<T>) {}

    isNone(): boolean {
        return false;
    }

    orElse(): Defined<T> {
        return this.value;
    }

    orCall(): Defined<T> {
        return this.value;
    }

    orNull(): Defined<T> | null {
        return this.value;
    }

    orThrow(): Defined<T> {
        return this.value;
    }

    map<U>(f: MapCallback<T, U>): MaybeOnce<U> {
        return maybe(f(this.value));
    }

    get<K extends keyof Defined<T>>(key: K): MaybeOnce<Defined<T>[K]> {
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

    return some(value) as MaybeOnce<T>;
}

export function some<T>(value: T): Maybe<T> {
    if (value == null) {
        throw new Error('Some expects non-null values');
    }
    return new Some(value as Defined<T>);
}
