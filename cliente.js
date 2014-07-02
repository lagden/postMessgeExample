(function(root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd)
        define(function() {
            return (root.iframeResizeClient = factory());
        });
    else
        root.iframeResizeClient = factory();

}(this, function() {

    'use strict';

    return (function() {
        var iframe = null,
            intervalo = null;

        // var iframeOrigin = window.location.protocol + '//lagden.webfactional.com';
        var iframeOrigin = window.location.protocol + '//10.0.1.56:8080';

        function IframeResizeClientException(message) {
            this.message = message;
            this.name = "iframeResizeClientException";
        }

        function envia() {
            iframe.contentWindow.postMessage('init', iframeOrigin);
        }

        function recebe(event) {
            if (event.data === 'initiate')
                clearInterval(intervalo);
            else
                iframe.style.height = event.data + 'px';
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

        function initiate() {
            intervalo = setInterval(function() {
                envia();
            }, 3000);

            addEv(window, 'message', recebe);
        }

        return {
            load: function(id) {
                iframe = document.querySelector(id);
                if (iframe !== null)
                    initiate();
                else
                    throw new IframeResizeClientException('iFrame não encontrado');
            }
        };
    })();
}));
