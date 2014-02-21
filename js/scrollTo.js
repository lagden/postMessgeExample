(function(window) {

    'use strict';

    // provides requestAnimationFrame in a cross browser way
    window.requestAnimFrame = (function() {
        'use strict';
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();

    // ease
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    // scrollTo
    function scrollToAnimated(to, callback, duration) {
        var doc = document.documentElement || document.body,
            start = doc.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20,
            raf;

        duration = (typeof(duration) === 'undefined') ? 500 : duration;
        function animateScroll() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            doc.scrollTop = val;
            if (currentTime < duration) {
                raf = requestAnimFrame(animateScroll);
            } else {
                cancelAnimationFrame(raf);
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            }
        }
        animateScroll();
    }

    // AMD Support
    if (typeof define === 'function' && define.amd)
        define(function() { return scrollToAnimated; });
    else
        window.scrollToAnimated = scrollToAnimated;

}(window));