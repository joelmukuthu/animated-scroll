const expect = require('unexpected');
const { default: AnimatedScroll } = require('../src/AnimatedScroll');

describe('AnimatedScroll', function () {
    it('throws', function () {
        expect(function () {
            new AnimatedScroll();
        }, 'not to error');
    });
});
