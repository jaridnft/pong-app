!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SVG_NS="http://www.w3.org/2000/svg"},function(e,t,n){e.exports=n.p+"public/fonts/slkscr-webfont.eot"},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),s=n(5),u=function(e){return e&&e.__esModule?e:{default:e}}(s),a=function(){function e(t,n,i){r(this,e),this.element=t,this.width=n,this.height=i,this.gameElement=document.getElementById(this.element),this.board=new u.default(this.width,this.height)}return i(e,[{key:"render",value:function(){this.gameElement.innerHTML="";var e=document.createElementNS(o.SVG_NS,"svg");e.setAttributeNS(null,"width",this.width),e.setAttributeNS(null,"height",this.height),e.setAttributeNS(null,"viewBox","0 0 "+this.width+" "+this.height),this.gameElement.appendChild(e),this.board.render(e)}}]),e}();t.default=a},function(e,t,n){var r=n(6);"string"==typeof r&&(r=[[e.i,r,""]]);n(11)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){"use strict";n(3);var r=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=new i.default("game",512,256);!function e(){o.render(),requestAnimationFrame(e)}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),s=function(){function e(t,n){r(this,e),this.width=t,this.height=n}return i(e,[{key:"render",value:function(e){var t=document.createElementNS(o.SVG_NS,"rect");t.setAttributeNS(null,"width",this.width),t.setAttributeNS(null,"height",this.width),t.setAttributeNS(null,"stroke","#353535");var n=document.createElementNS(o.SVG_NS,"line");n.setAttributeNS(null,"x1",this.width/2),n.setAttributeNS(null,"y1",0),n.setAttributeNS(null,"x2",this.width/2),n.setAttributeNS(null,"y2",this.height),n.setAttributeNS(null,"stroke","white"),n.setAttributeNS(null,"stroke-dasharray","7 5"),n.setAttributeNS(null,"stroke-width","4"),e.appendChild(n),e.appendChild(t)}}]),e}();t.default=s},function(e,t,n){t=e.exports=n(7)(),t.push([e.i,'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:Silkscreen Web;src:url('+n(1)+");src:url("+n(1)+'?#iefix) format("embedded-opentype"),url('+n(10)+') format("woff"),url('+n(9)+') format("truetype"),url('+n(8)+'#silkscreennormal) format("svg");font-weight:400;font-style:normal}html{font-size:16px}body{align-items:center;display:flex;font-family:Silkscreen Web,monotype;height:100vh;justify-content:center;width:100%}h1{font-size:2.5rem;margin-bottom:1rem;text-align:center}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(e,t,n){e.exports=n.p+"public/fonts/slkscr-webfont.svg"},function(e,t,n){e.exports=n.p+"public/fonts/slkscr-webfont.ttf"},function(e,t,n){e.exports=n.p+"public/fonts/slkscr-webfont.woff"},function(e,t){function n(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=d[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(a(r.parts[o],t))}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(a(r.parts[o],t));d[r.id]={id:r.id,refs:1,parts:s}}}}function r(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],o=i[0],s=i[1],u=i[2],a=i[3],l={css:s,media:u,sourceMap:a};n[o]?n[o].parts.push(l):t.push(n[o]={id:o,parts:[l]})}return t}function i(e,t){var n=b(),r=g[g.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function u(e){var t=document.createElement("link");return t.rel="stylesheet",i(e,t),t}function a(e,t){var n,r,i;if(t.singleton){var a=v++;n=m||(m=s(t)),r=l.bind(null,n,a,!1),i=l.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(t),r=c.bind(null,n),i=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=f.bind(null,n),i=function(){o(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function l(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}function f(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function c(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([n],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(i),o&&URL.revokeObjectURL(o)}var d={},h=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}},p=h(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),b=h(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,v=0,g=[];e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},void 0===t.singleton&&(t.singleton=p()),void 0===t.insertAt&&(t.insertAt="bottom");var i=r(e);return n(i,t),function(e){for(var o=[],s=0;s<i.length;s++){var u=i[s],a=d[u.id];a.refs--,o.push(a)}if(e){n(r(e),t)}for(var s=0;s<o.length;s++){var a=o[s];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete d[a.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()}]);