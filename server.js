(function(root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd)
        define(function() {
            return (root.iframeResizeServer = factory());
        });
    else
        root.iframeResizeServer = factory();

}(this, function() {

    'use strict';

    return (function() {

        /* // opts
        body.scrollHeight,
        html.scrollHeight,
        body.offsetHeight,
        html.offsetHeight,
        html.clientHeight
        // */

        var source, origin;

        var body = document.body,
            html = document.documentElement
        //     height = Math.max(
        //         html.scrollHeight,
        //         body.offsetHeight,
        //         html.offsetHeight
        //     ),
        var btn,
            // height = (btn) ? btn.offsetTop + 50 : Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, html.clientHeight),
            height = Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, html.clientHeight),
            first = false;


        // setTimeout(function(){
        //     btn = document.getElementById('BTNSALVAR');
        //     height = (btn) ? btn.offsetTop + 50 : Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, html.clientHeight);
        // }, 2000);

        function resize() {
            // var newHeight = Math.max(
            //     html.scrollHeight,
            //     body.offsetHeight,
            //     html.offsetHeight
            // );
            /*
            console.log(
                'body.scrollHeight ' + body.scrollHeight,
                'html.scrollHeight ' + html.scrollHeight,
                'body.offsetHeight ' + body.offsetHeight,
                'html.offsetHeight ' + html.offsetHeight,
                'html.clientHeight ' + html.clientHeight
            );
            // */

            // var newHeight = (btn) ? btn.offsetTop + 50 : 0;
            var newHeight = Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, html.clientHeight);

            var btn = document.getElementById('BTNSALVAR');
            var offset = (btn) ? btn.offsetTop : 'sem btn';

            console.log(newHeight, height);
            console.log(btn, offset);

            if (newHeight !== height || first === false) {
                height = newHeight;
                if (source && origin) {
                    first = true;
                    source.postMessage(height, origin);
                }
            }
        }

        function recebe(event) {
            if (event.data === 'init') {
                source = event.source;
                origin = event.origin;
                source.postMessage('initiate', origin);
            }
        }

        function addEv(el, eventName, handler, usarCaptura) {
            usarCaptura = usarCaptura || false;
            if (el.addEventListener)
                el.addEventListener(eventName, handler, usarCaptura);
            else
                el.attachEvent('on' + eventName, function() {
                    handler.call(el);
                });
        }

        return {
            init: function() {
                window.setInterval(function() {
                    resize();
                }, 1000);

                addEv(window, 'message', recebe);
            }
        };
    })();
}));