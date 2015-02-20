/* globals define, console */
'use strict';

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return (root.IframeResize = factory());
    });
  } else {
    root.IframeResize = factory();
  }
}(window, function() {

  var IframeResize;

  IframeResize = (function() {

    function log(args){
      console.debug(args);
    }

    function IframeResize(i, m, o, debug) {
      this.debug = debug || false;
      this.iframe = i;
      this.origin = o;
      this.msg = m;
      this.events = {
        'recebe': this.recebe.bind(this)
      };
      this.init();
    }

    IframeResize.prototype = {
      init: function() {
        window.addEventListener('message', this.events.recebe);
        this.envia();
        this.log('IframeResize->init');
      },
      envia: function(m) {
        m = m || this.msg;
        this.iframe.contentWindow.postMessage(m, this.origin);
        this.log('IframeResize->envia', m);
      },
      recebe: function(event) {
        this.iframe.style.height = event.data + 'px';
        this.log('IframeResize->recebe', event.data);
      },
      log: function() {
        if (this.debug) {
          var args = Array.prototype.slice.call(arguments);
          log(args);
        }
      }
    };

    return IframeResize;

  })();

  return IframeResize;

}));