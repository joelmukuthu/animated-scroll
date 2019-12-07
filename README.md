# animated-scroll

[![Greenkeeper badge](https://badges.greenkeeper.io/joelmukuthu/animated-scroll.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/joelmukuthu/animated-scroll.svg?branch=master)](https://travis-ci.org/joelmukuthu/animated-scroll) [![Licence](https://img.shields.io/npm/l/animated-scroll.svg)](https://github.com/joelmukuthu/animated-scroll/blob/master/LICENSE.md) [![Coverage Status](https://coveralls.io/repos/github/joelmukuthu/animated-scroll/badge.svg?branch=master)](https://coveralls.io/github/joelmukuthu/animated-scroll?branch=master) [![Bower version](https://img.shields.io/bower/v/animated-scroll.svg)](https://github.com/joelmukuthu/animated-scroll) [![npm version](https://img.shields.io/npm/v/animated-scroll.svg)](https://www.npmjs.com/package/animated-scroll)

Allows animating `scrollTop` and/or `scrollLeft` of an HTML element. Uses
`requestAnimationFrame` to provide smooth animations and returns a `Promise` to
notify when the animation is completed.

### Installation
Install with bower:
```sh
bower install animated-scroll
```
Or with npm:
```sh
npm install animated-scroll
```
Or simply download the
[latest release](https://github.com/joelmukuthu/animated-scroll/releases/latest).

### Usage
The pre-built files can be found in the `dist/` directory.
`dist/AnimatedScroll.min.js` is minified and production-ready. It has a UMD
wrapper so you can access it as:

```javascript
var AnimatedScroll = require('animated-scroll');
// or
import AnimatedScroll from 'animated-scroll';
// or
define([ 'path/to/animated-scroll' ], function (AnimatedScroll) {});
// or
var AnimatedScroll = window.AnimatedScroll;
```

### Example
```javascript
var element = document.getElementById('myElement');
var scroll = new AnimatedScroll(element);

scroll.top(100).then(function (newTop) {
    // newTop === 100
    console.log('#myElement\'s scrollTop is now', newTop);
});

scroll.left(100).then(function (newLeft) {
    // newLeft === 100
    console.log('#myElement\'s scrollLeft is now', newLeft);
});

scroll.to({ left: 100, top: 100 }).then(function (coords) {
    console.log('#myElement\'s scrollTop is now', coords.top);
    console.log('#myElement\'s scrollLeft is now', coords.left);
});
```

### API
#### AnimatedScroll.prototype.top(top [, duration [, easing]]) : Promise
Animates the scrollTop of `element` from it's current `scrollTop` to the new
`scrollTop` in a time-frame of `duration` and using the provided `easing`
function (`duration` and `easing` are optional).

It returns a promise which is resolved with the value of the new `scrollTop`
when the animation is complete.

`duration` is in milliseconds and defaults to 400 if not provided. If set to `0`
or `false`, then the `scrollTop` is set without animating. In this case an
already fulfilled promise is returned.

If no `easing` is provided and `duration` is provided then the default easing
function used is `easeInOutQuad`.

Calling `.top` on an element while a `scrollTop` animation is currently ongoing
will stop that animation and start a new one i.e. animations are not queued. You
can queue animations by hooking into the `.then` of the returned promise.

#### AnimatedScroll.prototype.left(top [, duration [, easing]]) : Promise
Exactly the same as `.top` but for `scrollLeft` :)

#### AnimatedScroll.prototype.to({ top, left } [, duration [, easing]]) : Promise
Convinient way to animate both `scrollTop` and `scrollLeft`. Accepts an object
with `top` and `left` properties and returns a promise which resolves with an
object containing the new `top` and `left` values.

#### AnimatedScroll.prototype.stopTop() : undefined
Stops any currently-running animation of `scrollTop`.

#### AnimatedScroll.prototype.stopLeft() : undefined
Stops any currently-running animation of `scrollLeft`.

#### AnimatedScroll.prototype.stop() : undefined
Stops any currently-running animation of `scrollLeft` or `scrollTop`.

### Contributing
Contributions are welcomed! Here are the [contribution guidelines](CONTRIBUTING.md).

First clone the repository and install dependencies:
```sh
npm install
```
To run tests:
```sh
npm test
```
To lint the code:
```sh
npm run lint
```
To make a production build:
```sh
npm run build
```

### License
[The MIT License](LICENSE.md)
