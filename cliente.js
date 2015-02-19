'use strict';

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return (root.IframeResize = factory());
    });
  } else {
    root.IframeResize = factory();
  }
}(this, function() {
  var iframe, iframeOrigin;

  function envia(msg) {
    iframe.contentWindow.postMessage(msg, iframeOrigin);
  }

  function recebe(event) {
    console.debug('cliente', 'recebe', event.data);
    // iframe.style.height = event.data + 'px';
  }

  function init() {
    window.addEventListener('message', recebe);
    envia('TExClientInit');
  }

  return {
    load: function(i, o) {
      iframe = i;
      iframeOrigin = o;
      init();
    }
  };
}));
