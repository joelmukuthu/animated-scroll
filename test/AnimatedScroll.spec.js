const expect = require('unexpected');
const AnimatedScroll = require('../src/AnimatedScroll');

describe('AnimatedScroll', function () {
    it('throws if not passed an element', function () {
        return expect(
            function () {
                new AnimatedScroll();
            },
            'to throw',
            'provide a DOM element'
        );
    });

    it('throws if passed an invalid element', function () {
        return expect(
            function () {
                new AnimatedScroll({});
            },
            'to throw',
            'the element should be a DOM element'
        );
    });

    describe('with a timeIncrement option', function () {
        const element = document.createElement('div');

        it('throws if the timeIncrement is not a number', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { timeIncrement: 'as' });
                },
                'to throw',
                'the timeIncrement option should be a number'
            );
        });

        it('throws if the timeIncrement is less than zero', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { timeIncrement: -1 });
                },
                'to throw',
                'the timeIncrement option should be greater than or equal to zero'
            );
        });
    });

    describe('with a duration option', function () {
        const element = document.createElement('div');

        it('throws if the duration is not a number', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { duration: 'as' });
                },
                'to throw',
                'the duration option should be a number'
            );
        });

        it('throws if the duration is less than zero', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { duration: -1 });
                },
                'to throw',
                'the duration option should be greater than or equal to zero'
            );
        });
    });

    describe('with an easing option', function () {
        const element = document.createElement('div');

        it('throws if the easing is not a function', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { easing: 'as' });
                },
                'to throw',
                'the easing option should be a function'
            );
        });

        it('throws if the duration is less than zero', function () {
            return expect(
                function () {
                    new AnimatedScroll(element, { duration: -1 });
                },
                'to throw',
                'the duration option should be greater than or equal to zero'
            );
        });
    });

    describe('with no options', function () {
        const element = document.createElement('div');

        it('defaults timeIncrement to 20ms', function () {
            const scroll = new AnimatedScroll(element);
            return expect(scroll, 'to satisfy', { timeIncrement: 20 });
        });

        it('defaults duration to 400ms', function () {
            const scroll = new AnimatedScroll(element);
            return expect(scroll, 'to satisfy', { duration: 400 });
        });

        it('defaults the easing to an in-built easing function', function () {
            const scroll = new AnimatedScroll(element);
            return expect(scroll, 'to satisfy', {
                easing: expect.it('to be a function')
            });
        });
    });
});
