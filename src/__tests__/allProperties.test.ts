import { maybe } from '../maybe';
import { allProperties } from '../allProperties';

describe('allProperties', () => {
    it('return object if all of the properties are not None', () => {
        expect(
            allProperties({
                foo: maybe('foo'),
                bar: maybe(42),
                baz: maybe(false)
            }).orThrow()
        ).toEqual({
            foo: 'foo',
            bar: 42,
            baz: false
        });
    });

    it('allows to mix in non-maybe proeprties', () => {
        expect(
            allProperties({
                foo: 'foo',
                bar: maybe(42),
                baz: maybe(false)
            }).orThrow()
        ).toEqual({
            foo: 'foo',
            bar: 42,
            baz: false
        });
    });

    it('return none if at least one property is None', () => {
        expect(
            allProperties({
                foo: maybe('foo'),
                bar: maybe(null),
                baz: maybe(false)
            }).isNone()
        ).toBe(true);
    });

    it('return none if at least one property is null', () => {
        expect(
            allProperties({
                foo: maybe('foo'),
                bar: null,
                baz: maybe(false)
            }).isNone()
        ).toBe(true);
    });

    it('return none if at least one property is undefined', () => {
        expect(
            allProperties({
                foo: maybe('foo'),
                bar: undefined,
                baz: maybe(false)
            }).isNone()
        ).toBe(true);
    });
});
