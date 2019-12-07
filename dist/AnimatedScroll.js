/**
 * animated-scroll
 * Version: 0.0.3
 * (c) 2019 Joel Mukuthu
 * MIT License
 * Built on: 07-12-2019 12:54:04 GMT+0100
 **/

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.AnimatedScroll = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var easeInOutQuad = function easeInOutQuad(time, start, change, duration) {
        time /= duration / 2;
        if (time < 1) {
            return change / 2 * time * time + start;
        }

        time--;
        return -change / 2 * (time * (time - 2) - 1) + start;
    };

    var validatePositiveNumber = function validatePositiveNumber(number, name) {
        if (typeof number !== 'number' || isNaN(number)) {
            throw new Error(name + ' should be a number');
        }
        if (number < 0) {
            throw new Error(name + ' should be greater than or equal to zero');
        }
    };

    var AnimatedScroll = function () {
        function AnimatedScroll(element) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _classCallCheck(this, AnimatedScroll);

            if (!element) {
                throw new Error('provide a DOM element');
            }

            if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object' || typeof element.nodeName !== 'string') {
                throw new Error('the element should be a DOM element');
            }

            this.element = element;

            var timeIncrement = options.timeIncrement;
            if (typeof timeIncrement !== 'undefined') {
                validatePositiveNumber(timeIncrement, 'the timeIncrement option');
                this.timeIncrement = timeIncrement;
            } else {
                this.timeIncrement = 20;
            }

            var duration = options.duration;
            if (typeof duration !== 'undefined' && duration !== false) {
                validatePositiveNumber(duration, 'the duration option');
                this.duration = duration;
            } else {
                this.duration = 400;
            }

            var easing = options.easing;
            if (typeof easing !== 'undefined') {
                if (typeof easing !== 'function') {
                    throw new Error('the easing option should be a function');
                }
                this.easing = easing;
            } else {
                this.easing = easeInOutQuad;
            }
        }

        _createClass(AnimatedScroll, [{
            key: '_scroll',
            value: function _scroll(direction, offset) {
                var _this = this;

                var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.duration;
                var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.easing;

                return new Promise(function (resolve) {
                    validatePositiveNumber(offset, direction);

                    if (duration !== false) {
                        validatePositiveNumber(duration, 'duration');
                    }
                    if (typeof easing !== 'function') {
                        throw new Error('easing should be a function');
                    }

                    var elementProperty = void 0;
                    var animationProperty = void 0;
                    if (direction === 'top') {
                        elementProperty = 'scrollTop';
                        animationProperty = 'topAnimation';

                        _this.stopTop();
                    } else {
                        elementProperty = 'scrollLeft';
                        animationProperty = 'leftAnimation';

                        _this.stopLeft();
                    }

                    offset = parseFloat(offset);
                    if (!duration) {
                        _this.element[elementProperty] = offset;
                        return resolve(_this.element[elementProperty]);
                    }

                    // based on http://stackoverflow.com/a/16136789/1004406
                    var start = _this.element[elementProperty];
                    var change = offset - start;
                    var timeIncrement = _this.timeIncrement;

                    duration = parseInt(duration, 10); // you want to use radix 10
                    // so you get a decimal number even with a leading 0 and an old browser ([IE8, Firefox 20, Chrome 22 and older][1])

                    var currentTime = 0;
                    var animate = function animate() {
                        currentTime += timeIncrement;

                        var newValue = easing(currentTime, start, change, duration);
                        try {
                            validatePositiveNumber(newValue);
                        } catch (e) {
                            _this._stop(direction); // TODO: ensure this is tested
                            e.message += ' (check your easing function)';
                            throw e;
                        }

                        _this.element[elementProperty] = newValue;

                        if (currentTime < duration) {
                            _this[animationProperty] = requestAnimationFrame(animate, timeIncrement);
                        } else {
                            resolve(_this.element[elementProperty]);
                        }
                    };
                    animate();
                });
            }
        }, {
            key: 'top',
            value: function top(_top, duration, easing) {
                return this._scroll('top', _top, duration, easing);
            }
        }, {
            key: 'left',
            value: function left(_left, duration, easing) {
                return this._scroll('left', _left, duration, easing);
            }
        }, {
            key: 'to',
            value: function to(_ref, duration, easing) {
                var top = _ref.top,
                    left = _ref.left;

                if (top === undefined) {
                    return this.left(left, duration, easing);
                }

                if (left === undefined) {
                    return this.top(top, duration, easing);
                }

                return Promise.all([this.top(top, duration, easing), this.left(left, duration, easing)]).then(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        top = _ref3[0],
                        left = _ref3[1];

                    return { top: top, left: left };
                });
            }
        }, {
            key: '_stop',
            value: function _stop(direction) {
                var animation = direction === 'top' ? this.topAnimation : this.leftAnimation;

                if (animation) {
                    cancelAnimationFrame(animation);
                }
            }
        }, {
            key: 'stopTop',
            value: function stopTop() {
                return this._stop('top');
            }
        }, {
            key: 'stopLeft',
            value: function stopLeft() {
                return this._stop('left');
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.stopTop();
                this.stopLeft();
            }
        }]);

        return AnimatedScroll;
    }();

    exports.default = AnimatedScroll;
    module.exports = exports['default'];
});
