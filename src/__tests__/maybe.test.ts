import { maybe, some, isMaybe, Maybe } from '../maybe';

describe('maybe', () => {
    it('prevents double nesting', () => {
        expect(maybe(maybe('foo')).orThrow()).toBe('foo');
    });

    describe('some', () => {
        it('throws on null', () => {
            expect(() => some(null)).toThrow(
                'some() does not accept null or undefined'
            );
        });

        it('throws on undefined', () => {
            expect(() => some(undefined)).toThrow(
                'some() does not accept null or undefined'
            );
        });

        it('does not throw on proper value', () => {
            expect(() => some('value')).not.toThrow();
        });
    });
    describe('isMaybe', () => {
        it('is true for maybe(null)', () => {
            expect(isMaybe(maybe(null))).toBe(true);
        });

        it('is true for maybe(undefined)', () => {
            expect(isMaybe(maybe(undefined))).toBe(true);
        });

        it('is true for maybe(someValue)', () => {
            expect(isMaybe(maybe('foo'))).toBe(true);
        });

        it('is false for non-maybe value', () => {
            expect(isMaybe('foo')).toBe(false);
        });
    });
    describe('isNone', () => {
        it('is false for non-null/undefined value', () => {
            expect(maybe('foo').isNone()).toBe(false);
        });

        it('is true for null', () => {
            expect(maybe(null).isNone()).toBe(true);
        });

        it('is true for undefined', () => {
            expect(maybe(undefined).isNone()).toBe(true);
        });
    });

    describe('orNull', () => {
        it('returns boxed value if it is not null', () => {
            expect(maybe('foo').orNull()).toEqual('foo');
        });

        it('returns null if boxed value is null', () => {
            expect(maybe(null).orNull()).toBeNull();
        });

        it('returns null if boxed value is undefined', () => {
            expect(maybe(undefined).orNull()).toBeNull();
        });
    });

    describe('orElse', () => {
        it('returns boxed value if it is not null', () => {
            expect(maybe('foo').orElse('bar')).toEqual('foo');
        });

        it('returns fallback value if boxed value is null', () => {
            expect(maybe(null as string | null).orElse('bar')).toEqual('bar');
        });

        it('returns fallback value if boxed value is undefined', () => {
            expect(
                maybe(undefined as string | undefined).orElse('bar')
            ).toEqual('bar');
        });
    });

    describe('orCall', () => {
        const getFallback = () => 'bar';
        it('returns boxed value if it is not null', () => {
            expect(maybe('foo').orCall(getFallback)).toEqual('foo');
        });

        it('returns fallback value if boxed value is null', () => {
            expect(maybe(null as string | null).orCall(getFallback)).toEqual(
                'bar'
            );
        });

        it('returns fallback value if boxed value is undefined', () => {
            expect(
                maybe(undefined as string | undefined).orCall(getFallback)
            ).toEqual('bar');
        });
    });

    describe('orThrow', () => {
        it('returns boxed value if it is not null', () => {
            expect(maybe('foo').orThrow()).toEqual('foo');
        });

        it('throws exception if value is null', () => {
            expect(() => maybe(null).orThrow()).toThrow(TypeError);
        });

        it('throws exception if value is undefined', () => {
            expect(() => maybe(undefined).orThrow()).toThrow(TypeError);
        });

        it('has default message', () => {
            expect(() => maybe(null).orThrow()).toThrow(
                'Unexpected null value'
            );
        });

        it('allows to customize message', () => {
            const message = 'What a terrible failure';
            expect(() => maybe(null).orThrow(message)).toThrow(message);
        });
    });

    describe('map', () => {
        function addTenAndShout(
            input: Maybe<number | null | undefined>
        ): Maybe<string> {
            return input.map(x => x + 5).map(x => `${x}!`);
        }
        it('is null-safe', () => {
            const maybeValue = addTenAndShout(maybe(null));
            expect(maybeValue.isNone()).toBe(true);
        });

        it('is undefined-safe', () => {
            const maybeValue = addTenAndShout(maybe(undefined));

            expect(maybeValue.isNone()).toBe(true);
        });

        it('applies function to non-null values', () => {
            const maybeValue = addTenAndShout(maybe(5));

            expect(maybeValue.orThrow()).toEqual('10!');
        });

        it('propgates null values', () => {
            const maybeValue = maybe(5).map(() => null);
            expect(maybeValue.isNone()).toBe(true);
        });

        it('propgates undefined values', () => {
            const maybeValue = maybe(5).map(() => undefined);
            expect(maybeValue.isNone()).toBe(true);
        });

        it('propogates maybe values', () => {
            const maybeObject = maybe({ x: maybe('foo') });
            expect(maybeObject.map(object => object.x).orThrow()).toBe('foo');
        });
    });

    describe('get', () => {
        type UnsafeType =
            | null
            | undefined
            | {
                  foo?: null | {
                      bar?: null | {
                          baz?: null | string;
                      };
                  };
              };

        function getBaz(input: Maybe<UnsafeType>): Maybe<string> {
            return input
                .get('foo')
                .get('bar')
                .get('baz');
        }

        it('is null-safe', () => {
            expect(getBaz(maybe(null)).isNone()).toBe(true);
        });

        it('is undefined-safe', () => {
            expect(getBaz(maybe(undefined)).isNone()).toBe(true);
        });

        it('is safe for deeply nested data', () => {
            const unsafe: UnsafeType = { foo: {} };

            expect(getBaz(maybe(unsafe)).isNone()).toBe(true);
        });

        it('get nested data if it exists', () => {
            const unsafe: UnsafeType = { foo: { bar: { baz: 'Hello!' } } };

            expect(getBaz(maybe(unsafe)).orThrow()).toBe('Hello!');
        });

        it('works with arrays when requested element is missing', () => {
            const unsafeArray = ['foo', 'bar'];

            expect(
                maybe(unsafeArray)
                    .get(2)
                    .isNone()
            ).toBe(true);
        });

        it('works with arrays when element is found', () => {
            const unsafeArray = ['foo', 'bar', 'baz'];

            expect(
                maybe(unsafeArray)
                    .get(2)
                    .orThrow()
            ).toBe('baz');
        });

        it('works with nested maybe values', () => {
            const maybeObject = maybe({
                foo: maybe({ bar: maybe({ baz: maybe('Hello!') }) })
            });

            expect(
                maybeObject
                    .get('foo')
                    .get('bar')
                    .get('baz')
                    .orThrow()
            ).toBe('Hello!');
        });
    });
});
