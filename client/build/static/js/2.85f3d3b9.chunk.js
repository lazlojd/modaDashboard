(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{189:function(e,t,n){e.exports=n(206)},190:function(e,t,n){"use strict";function r(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(l){return void n(l)}c.done?t(s):Promise.resolve(s).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise(function(a,i){var o=e.apply(t,n);function c(e){r(o,a,i,c,s,"next",e)}function s(e){r(o,a,i,c,s,"throw",e)}c(void 0)})}}n.d(t,"a",function(){return a})},206:function(e,t,n){var r=function(){return this||"object"===typeof self&&self}()||Function("return this")(),a=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=a&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n(207),a)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(o){r.regeneratorRuntime=void 0}},207:function(e,t){!function(t){"use strict";var n,r=Object.prototype,a=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag",l="object"===typeof e,u=t.regeneratorRuntime;if(u)l&&(e.exports=u);else{(u=t.regeneratorRuntime=l?e.exports:{}).wrap=w;var h="suspendedStart",f="suspendedYield",d="executing",m="completed",p={},g={};g[o]=function(){return this};var y=Object.getPrototypeOf,v=y&&y(y(C([])));v&&v!==r&&a.call(v,o)&&(g=v);var E=O.prototype=x.prototype=Object.create(g);j.prototype=E.constructor=O,O.constructor=j,O[s]=j.displayName="GeneratorFunction",u.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===j||"GeneratorFunction"===(t.displayName||t.name))},u.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,O):(e.__proto__=O,s in e||(e[s]="GeneratorFunction")),e.prototype=Object.create(E),e},u.awrap=function(e){return{__await:e}},k(A.prototype),A.prototype[c]=function(){return this},u.AsyncIterator=A,u.async=function(e,t,n,r){var a=new A(w(e,t,n,r));return u.isGeneratorFunction(t)?a:a.next().then(function(e){return e.done?e.value:a.next()})},k(E),E[s]="Generator",E[o]=function(){return this},E.toString=function(){return"[object Generator]"},u.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},u.values=C,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=n)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,a){return c.type="throw",c.arg=e,t.next=r,a&&(t.method="next",t.arg=n),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var s=a.call(o,"catchLoc"),l=a.call(o,"finallyLoc");if(s&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),L(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;L(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:C(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=n),p}}}function w(e,t,n,r){var a=t&&t.prototype instanceof x?t:x,i=Object.create(a.prototype),o=new I(r||[]);return i._invoke=function(e,t,n){var r=h;return function(a,i){if(r===d)throw new Error("Generator is already running");if(r===m){if("throw"===a)throw i;return D()}for(n.method=a,n.arg=i;;){var o=n.delegate;if(o){var c=N(o,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var s=b(e,t,n);if("normal"===s.type){if(r=n.done?m:f,s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=m,n.method="throw",n.arg=s.arg)}}}(e,n,o),i}function b(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(r){return{type:"throw",arg:r}}}function x(){}function j(){}function O(){}function k(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function A(e){var t;this._invoke=function(n,r){function i(){return new Promise(function(t,i){!function t(n,r,i,o){var c=b(e[n],e,r);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"===typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then(function(e){t("next",e,i,o)},function(e){t("throw",e,i,o)}):Promise.resolve(l).then(function(e){s.value=e,i(s)},function(e){return t("throw",e,i,o)})}o(c.arg)}(n,r,t,i)})}return t=t?t.then(i,i):i()}}function N(e,t){var r=e.iterator[t.method];if(r===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=n,N(e,t),"throw"===t.method))return p;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=b(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,p;var i=a.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=n),t.delegate=null,p):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function C(e){if(e){var t=e[o];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(a.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=n,t.done=!0,t};return i.next=i}}return{next:D}}function D(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},384:function(e,t,n){"use strict";n.r(t);var r=n(189),a=n.n(r),i=n(190),o=n(6),c=n(7),s=n(9),l=n(8),u=n(10),h=n(36),f=n(1),d=n.n(f),m=n(3),p=n(5),g=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).callApi=function(){var e=Object(i.a)(a.a.mark(function e(t){var n,r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:if(r=e.sent,200===n.status){e.next=8;break}throw Error(r.message);case 8:return e.abrupt("return",r);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.handleActivation=n.handleActivation.bind(Object(h.a)(Object(h.a)(n))),n.handleGenerate=n.handleGenerate.bind(Object(h.a)(Object(h.a)(n))),n.onDismiss=n.onDismiss.bind(Object(h.a)(Object(h.a)(n))),n.verifyAccessKey=n.verifyAccessKey.bind(Object(h.a)(Object(h.a)(n))),n.handleDownload=n.handleDownload.bind(Object(h.a)(Object(h.a)(n))),n.state={accessKey:"",authorizedAccessKey:!1,activateResponse:"",generateResponse:"",designerInfo:{},generateSuccess:!1,activateVisible:!1,generateVisible:!1,designerInfoVisible:!1,resultVisible:!1},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"verifyAccessKey",value:function(){var e=!0;return 0==this.state.accessKey.length?(alert("Error - no access key provided"),e=!1):this.state.authorizedAccessKey||(alert("Unauthorized access key - to activate this functionality, please input correct access key"),e=!1),e}},{key:"onDismiss",value:function(e){0==e?this.setState({activateVisible:!1}):1==e&&this.setState({generateVisible:!1})}},{key:"handleCode",value:function(){var e=Object(i.a)(a.a.mark(function e(t){var n,r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,e.next=3,fetch("/api/codeVerification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:n})});case 3:return r=e.sent,e.next=6,r.json();case 6:200!=e.sent.status?this.setState({authorizedAccessKey:!1,accessKey:n}):this.setState({authorizedAccessKey:!0,accessKey:n});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleDownload",value:function(){this.verifyAccessKey()&&this.callApi("/api/update").then(function(e){console.log(e.message)}).catch(function(e){return console.log(e)})}},{key:"handleActivation",value:function(e){var t=this;this.verifyAccessKey()&&this.callApi("/api/activate").then(function(e){console.log(e.message),t.setState({activateResponse:e.message,activateVisible:!0})}).catch(function(e){return console.log(e)})}},{key:"handleGenerate",value:function(e){var t=this;this.verifyAccessKey()&&this.callApi("/api/generate").then(function(e){200!=e.status?t.setState({generateResponse:e.message,generateSuccess:!1,generateVisible:!0}):t.setState({designerInfo:e.data,resultVisible:!0})}).catch(function(e){return console.log(e)})}},{key:"handleIds",value:function(e){}},{key:"handleShowDesignerInfo",value:function(){var e=this;this.verifyAccessKey()&&this.callApi("/api/showinfo").then(function(t){console.log(t),e.setState({designerInfo:t,designerInfoVisible:!0})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this,t=function(t){if(console.log(e.state.designerInfoVisible&&e.state.authorizedAccessKey),e.state.designerInfoVisible||0==t&&e.state.resultVisible)return d.a.createElement(m.f,null," ",d.a.createElement(m.g,null,d.a.createElement(m.J,{responsive:!0,striped:!0},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"Code"),d.a.createElement("th",null,"Name"),d.a.createElement("th",null,"Year"),d.a.createElement("th",null,"Email"),d.a.createElement("th",null,"Number"),d.a.createElement("th",null,"Choices/Selections"))),d.a.createElement("tbody",null,function(t){var n=[],r="";for(var a in e.state.designerInfo){var i;i=0==t?e.state.designerInfo[a].models:e.state.designerInfo[a].choices;for(var o=0;o<i.length;o++)if(0==t)r+="Model "+(o+1)+": "+i[o]+"  |  ";else{for(var c="Model "+(o+1)+": ",s=0;s<i[o].length;s++)c+=i[o][s]+" | ";r+=c.slice(0,-2)+"\n"}0==t&&r.slice(0,-2),console.log(a),n.push(d.a.createElement("tr",null,d.a.createElement("td",null,a),d.a.createElement("td",null,e.state.designerInfo[a].info[0]),d.a.createElement("td",null,e.state.designerInfo[a].info[1]),d.a.createElement("td",null,e.state.designerInfo[a].info[2]),d.a.createElement("td",null,e.state.designerInfo[a].info[3]),d.a.createElement("td",null,r))),r=""}return n}(t))))," ")};return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement(m.f,{className:e.state.authorizedAccessKey?"bg-success":"bg-warning"},d.a.createElement(m.g,null,d.a.createElement(m.p,{inline:!0},d.a.createElement(m.w,{htmlFor:"adminCode",className:"pr-1"}," Admin access key"),d.a.createElement(m.s,{type:"text",id:"adminCode",value:this.state.accessKey,onChange:function(t){return e.handleCode(t)}})))),d.a.createElement(m.f,{className:"card-accent-primary"},d.a.createElement(m.j,null,"Activate model decision submissions"),d.a.createElement(m.g,null,"Allow models to submit their ranked model preferences and view their choices."),d.a.createElement(m.h,null,e.state.authorizedAccessKey?d.a.createElement(p.m,{className:"justify-center mb-0",label:!0,color:"info",size:"lg",onChange:function(t){return e.handleActivation(t)}}):d.a.createElement(p.m,{className:"justify-center mb-0",label:!0,color:"info",size:"lg",onChange:function(t){return e.handleActivation(t)},disabled:!0}))),d.a.createElement(m.a,{color:"success",isOpen:e.state.activateVisible,toggle:function(){return e.onDismiss(0)}},e.state.activateResponse),d.a.createElement(m.f,{className:"card-accent-secondary"},d.a.createElement(m.j,null,"Generate matching"),d.a.createElement(m.g,null,"Generate designer - model matching based on matching algorithm and view results."),d.a.createElement(m.h,null,d.a.createElement(m.e,{type:"submit",size:"sm",color:"info",onClick:function(){return e.handleGenerate()}},d.a.createElement("i",{className:"fa icon-share"})," Generate"))),function(){var t;return t=e.state.generateSuccess?"success":"danger",d.a.createElement(m.a,{color:t,isOpen:e.state.generateVisible,toggle:function(){return e.onDismiss(1)}},e.state.generateResponse)}(),t(0),d.a.createElement(m.f,{className:"card-accent-warning"},d.a.createElement(m.j,null,"Spreadsheet ID's"),d.a.createElement(m.g,null,"Enter the spreadsheet ID's of the google sheets with designer info and the google sheet with the model call form information -- NOT implemented in this version"),d.a.createElement(m.h,null,d.a.createElement(m.p,{action:"",inline:!0},d.a.createElement(m.q,{className:"pr-1"},d.a.createElement(m.w,{htmlFor:"id1",className:"pr-1"},"Model Form"),d.a.createElement(m.s,{type:"text",id:"id1",required:!0})),d.a.createElement(m.q,{className:"pr-1 text-right"},d.a.createElement(m.w,{htmlFor:"id2",className:"pr-1"},"Designer Form"),d.a.createElement(m.s,{type:"text",id:"id2",required:!0})),d.a.createElement(m.e,{type:"submit",size:"sm",color:"primary"},d.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit")))),d.a.createElement(m.f,{className:"card-accent-info"},d.a.createElement(m.j,null,"Download CSV"),d.a.createElement(m.g,null,"Update excel sheet with selected models, all their associated information, and the designer that selected them. Sheet can be found at this link ",d.a.createElement("br",null),d.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1y7wQ83w_HekSYmCiFftDaxICPW0fapGdoDOTh2sL5IA/edit#gid=0"},"https://docs.google.com/spreadsheets/d/1y7wQ83w_HekSYmCiFftDaxICPW0fapGdoDOTh2sL5IA/edit#gid=0")),d.a.createElement(m.h,null,d.a.createElement(m.e,{type:"submit",size:"sm",color:"info",onClick:function(){return e.handleDownload()}},d.a.createElement("i",{className:"fa icon-share"})," Generate"))),d.a.createElement(m.f,{className:"card-accent-secondary"},d.a.createElement(m.j,null,"Show designer information"),d.a.createElement(m.g,null,"Show designer information from designer spreadsheet along with designer code"),d.a.createElement(m.h,null,d.a.createElement(m.e,{type:"submit",size:"sm",color:"info",onClick:function(){return e.handleShowDesignerInfo()}},d.a.createElement("i",{className:"fa icon-eye"})," Show"))),t(1))}}]),t}(f.Component);t.default=g}}]);
//# sourceMappingURL=2.85f3d3b9.chunk.js.map