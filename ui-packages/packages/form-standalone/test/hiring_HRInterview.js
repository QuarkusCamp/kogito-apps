!function(e,t){for(var n in t)e[n]=t[n]}(window,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/channel/index.ts")}({"./src/api/index.ts":
  /*!**************************!*\
    !*** ./src/api/index.ts ***!
    \**************************/
  /*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.REQUEST="request",e.RESPONSE="response",e.SUBSCRIPTION="subscription",e.UNSUBSCRIPTION="unsubscription",e.NOTIFICATION="notification"}(t.EnvelopeBusMessagePurpose||(t.EnvelopeBusMessagePurpose={}))},"./src/channel/EnvelopeServer.ts":
  /*!***************************************!*\
    !*** ./src/channel/EnvelopeServer.ts ***!
    \***************************************/
  /*! no static exports found */function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=n(/*! ../api */"./src/api/index.ts"),i=n(/*! ../common */"./src/common/index.ts"),s=function(){function e(e,t,n,o){var s=this;void 0===o&&(o=new i.EnvelopeBusMessageManager((function(t){return e.postMessage(r(r({},t),{targetEnvelopeId:s.id}))}),"EnvelopeServer")),this.origin=t,this.pollInit=n,this.manager=o,this.id=this.generateRandomId()}return Object.defineProperty(e.prototype,"envelopeApi",{get:function(){return this.manager.clientApi},enumerable:!0,configurable:!0}),e.prototype.startInitPolling=function(){var t=this;this.initPolling=setInterval((function(){t.pollInit(t).then((function(){return t.stopInitPolling()}))}),e.INIT_POLLING_INTERVAL_IN_MS),this.initPollingTimeout=setTimeout((function(){t.stopInitPolling(),console.info("Init polling timed out. Looks like the Envelope is not responding accordingly.")}),e.INIT_POLLING_TIMEOUT_IN_MS)},e.prototype.stopInitPolling=function(){clearInterval(this.initPolling),this.initPolling=void 0,clearTimeout(this.initPollingTimeout),this.initPollingTimeout=void 0},e.prototype.receive=function(e,t){e.targetEnvelopeId||(e.targetEnvelopeServerId===this.id?this.manager.server.receive(e,t):e.purpose===o.EnvelopeBusMessagePurpose.NOTIFICATION&&this.manager.server.receive(e,{}))},e.prototype.generateRandomId=function(){return"_"+Math.random().toString(36).substr(2,9)+"_"+(new Date).getMilliseconds()},e.INIT_POLLING_TIMEOUT_IN_MS=1e4,e.INIT_POLLING_INTERVAL_IN_MS=100,e}();t.EnvelopeServer=s},"./src/channel/index.ts":
  /*!******************************!*\
    !*** ./src/channel/index.ts ***!
    \******************************/
  /*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(/*! ./EnvelopeServer */"./src/channel/EnvelopeServer.ts"))},"./src/common/EnvelopeBusMessageManager.ts":
  /*!*************************************************!*\
    !*** ./src/common/EnvelopeBusMessageManager.ts ***!
    \*************************************************/
  /*! no static exports found */function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s},o=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(r(arguments[t]));return e};Object.defineProperty(t,"__esModule",{value:!0});var i=n(/*! ../api */"./src/api/index.ts"),s=function(){function e(e,t){var n,r,i=this;void 0===t&&(t=""+(new Date).getMilliseconds()),this.send=e,this.name=t,this.callbacks=new Map,this.remoteSubscriptions=[],this.localSubscriptions=new Map,this.clientApi=(n=new Map,r=new Map,{requests:new Proxy({},{set:function(e,t,r){return n.set(t,r),!0},get:function(e,t){var r,s=t;return null!==(r=n.get(s))&&void 0!==r?r:n.set(s,(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return i.request.apply(i,o([s],e))})).get(s)}}),notifications:new Proxy({},{set:function(e,t,n){return r.set(t,n),!0},get:function(e,t){var n,s=t;return null!==(n=r.get(s))&&void 0!==n?n:r.set(s,(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return i.notify.apply(i,o([s],e))})).get(s)}}),subscribe:function(e,t){return i.subscribe(e,t)},unsubscribe:function(e,t){return i.unsubscribe(e,t)}}),this.requestIdCounter=0}return Object.defineProperty(e.prototype,"server",{get:function(){var e=this;return{receive:function(t,n){return e.receive(t,n)}}},enumerable:!0,configurable:!0}),e.prototype.subscribe=function(e,t){var n,r=null!==(n=this.localSubscriptions.get(e))&&void 0!==n?n:[];return this.localSubscriptions.set(e,o(r,[t])),this.send({type:e,purpose:i.EnvelopeBusMessagePurpose.SUBSCRIPTION,data:[]}),t},e.prototype.unsubscribe=function(e,t){var n=this.localSubscriptions.get(e);if(n){var r=n.indexOf(t);r<0||(n.splice(r,1),this.send({type:e,purpose:i.EnvelopeBusMessagePurpose.UNSUBSCRIPTION,data:[]}))}},e.prototype.request=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=this.getNextRequestId();return this.send({requestId:o,type:e,data:n,purpose:i.EnvelopeBusMessagePurpose.REQUEST}),new Promise((function(e,n){t.callbacks.set(o,{resolve:e,reject:n})}))},e.prototype.notify=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];this.send({type:e,data:t,purpose:i.EnvelopeBusMessagePurpose.NOTIFICATION})},e.prototype.respond=function(e,t,n){if(e.purpose!==i.EnvelopeBusMessagePurpose.REQUEST)throw new Error("Cannot respond a message that is not a request");if(!e.requestId)throw new Error("Cannot respond a request without a requestId");this.send({requestId:e.requestId,purpose:i.EnvelopeBusMessagePurpose.RESPONSE,type:e.type,data:t,error:n})},e.prototype.callback=function(e){if(e.purpose!==i.EnvelopeBusMessagePurpose.RESPONSE)throw new Error("Cannot invoke callback with a message that is not a response");if(!e.requestId)throw new Error("Cannot acknowledge a response without a requestId");var t=this.callbacks.get(e.requestId);if(!t)throw new Error("Callback not found for "+e);this.callbacks.delete(e.requestId),e.error?(console.error(JSON.stringify(e.error)),t.reject(e.error)):t.resolve(e.data)},e.prototype.receive=function(e,t){var n,r,s=this;if(e.purpose!==i.EnvelopeBusMessagePurpose.RESPONSE)if(e.purpose!==i.EnvelopeBusMessagePurpose.REQUEST)if(e.purpose!==i.EnvelopeBusMessagePurpose.NOTIFICATION)if(e.purpose!==i.EnvelopeBusMessagePurpose.SUBSCRIPTION)if(e.purpose!==i.EnvelopeBusMessagePurpose.UNSUBSCRIPTION);else{a=e.type;var u=this.remoteSubscriptions.indexOf(a);u>=0&&this.remoteSubscriptions.splice(u,1)}else{var a=e.type;this.remoteSubscriptions.indexOf(a)<0&&this.remoteSubscriptions.push(a)}else{null===(n=t[a=e.type])||void 0===n||n.apply(t,e.data),this.remoteSubscriptions.indexOf(a)>=0&&this.send({type:a,purpose:i.EnvelopeBusMessagePurpose.NOTIFICATION,data:e.data});var c=e.type;(null!==(r=this.localSubscriptions.get(c))&&void 0!==r?r:[]).forEach((function(t){t.apply(void 0,o(e.data))}))}else{var p=e,l=t[p.type].apply(t,p.data);if(!(l instanceof Promise))throw new Error("Cannot make a request to '"+p.type+"' because it does not return a Promise");l.then((function(e){return s.respond(p,e)})).catch((function(e){return s.respond(p,void 0,e)}))}else this.callback(e)},e.prototype.getNextRequestId=function(){return this.name+"_"+this.requestIdCounter++},e}();t.EnvelopeBusMessageManager=s},"./src/common/index.ts":
  /*!*****************************!*\
    !*** ./src/common/index.ts ***!
    \*****************************/
  /*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(/*! ./EnvelopeBusMessageManager */"./src/common/EnvelopeBusMessageManager.ts"))}})},function(e,t,n){"use strict";n.r(t),n.d(t,"openForm",(function(){return s}));var r=n(0),o=function(){function e(e){this.doSubmit=e}return e.prototype.form_submit=function(e){return this.doSubmit(e)},e}(),i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function s(e){var t=document.createElement("iframe");t.srcdoc=e.formContent,t.style.width="100%",t.style.height="100%",t.style.border="none";var n=function(e,t,n,o,s){var u="file:"===window.location.protocol?"*":window.location.origin;return new r.EnvelopeServer({postMessage:function(t){return e.contentWindow.postMessage(t,"*")}},s||u,(function(e){return e.envelopeApi.requests.form_init({origin:e.origin,envelopeServerId:e.id},{data:n,context:i({schema:t},{formContext:o})})}))}(t,e.formSchema,e.formData,e.context,e.origin);return window.addEventListener("message",(function(t){n.receive(t.data,new o(e.doSubmit))})),e.container.appendChild(t),n.startInitPolling(),{getData:function(){return n.envelopeApi.requests.form_getFormData(),Promise.resolve(void 0)},reset:function(){return n.envelopeApi.requests.form_reset()},submit:function(){return new Promise((function(t,r){n.envelopeApi.requests.form_submit().then((function(n){e.doSubmit(n),t()})).catch((function(e){r(e)}))}))}}}}]).Forms);


function hiring_HRInterview(container) {
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "candidate": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "salary": {
            "type": "integer"
          },
          "skills": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": ["Person", "Developer"]
          }
        },
        "input": true,
        "output": true
      },
      "approve": {
        "type": "boolean",
        "output": true
      }
    }
  };

  const formContent = '<h1>Hello</h1>';


/*
  container: Element;
  formContent: string;
  formSchema: any;
  formData?: any;
  doSubmit: (data: any) => Promise<void>;
  origin?: string;
  context?: any;*/
  Forms.openForm({
    container: container,
    formSchema: schema,
    formContent: formContent,
    formData: {},
    doSubmit: (data) => {
      alert('hi');
    },
    origin: 'origin',
    context: {}
  })
}