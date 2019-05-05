import { maybe } from '../maybe';
import { first } from '../first';

describe('first', () => {
    it('returns none for empty array', () => {
        expect(first([]).isNone()).toBe(true);
    });

    it('returns none if all items are none', () => {
        expect(
            first([maybe(null), maybe(undefined), maybe(null)]).isNone()
        ).toBe(true);
    });
    it('returns first non-none item', () => {
        expect(first([maybe(null), maybe('foo'), maybe('bar')]).orThrow()).toBe(
            'foo'
        );
    });
});
