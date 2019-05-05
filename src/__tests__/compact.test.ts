import { maybe } from '../maybe';
import { compact } from '../compact';

describe('compact', () => {
    it('returns empty array if given empty array', () => {
        expect(compact([])).toEqual([]);
    });

    it('filters out None values', () => {
        expect(
            compact([
                maybe('foo'),
                maybe(null),
                maybe('bar'),
                maybe(undefined),
                maybe('baz')
            ])
        ).toEqual(['foo', 'bar', 'baz']);
    });
});
