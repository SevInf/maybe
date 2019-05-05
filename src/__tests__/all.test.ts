import { maybe } from '../maybe';
import { all } from '../all';

describe('all', () => {
    it('returns empty array if given empty array', () => {
        expect(all([]).orThrow()).toEqual([]);
    });

    it('returns values if all of them are not-non', () => {
        expect(
            all([maybe('foo'), maybe('bar'), maybe('baz')]).orThrow()
        ).toEqual(['foo', 'bar', 'baz']);
    });

    it('work with heterogenous arrays', () => {
        expect(all([maybe('foo'), maybe(5), maybe(false)]).orThrow()).toEqual([
            'foo',
            5,
            false
        ]);
    });

    it('return none if any of the items is none', () => {
        expect(all([maybe('foo'), maybe(null), maybe('bar')]).isNone()).toBe(
            true
        );
    });
});
