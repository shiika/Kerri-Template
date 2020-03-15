!function(t){var s={};function e(i){if(s[i])return s[i].exports;var n=s[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var n in t)e.d(i,n,function(s){return t[s]}.bind(null,n));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=0)}([function(t,s,e){t.exports=e(1)},function(t,s,e){"use strict";e.r(s);var i={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onComplete:t=>{},preStringTyped:(t,s)=>{},onStringTyped:(t,s)=>{},onLastStringBackspaced:t=>{},onTypingPaused:(t,s)=>{},onTypingResumed:(t,s)=>{},onReset:t=>{},onStop:(t,s)=>{},onStart:(t,s)=>{},onDestroy:t=>{}};let n=new class{load(t,s,e){if(t.el="string"==typeof e?document.querySelector(e):e,t.options={...i,...s},t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(t=>t.trim()),"string"==typeof t.options.stringsElement?t.stringsElement=document.querySelector(t.options.stringsElement):t.stringsElement=t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.display="none";const s=Array.prototype.slice.apply(t.stringsElement.children),e=s.length;if(e)for(let i=0;i<e;i+=1){const e=s[i];t.strings.push(e.innerHTML.trim())}}t.strPos=0,t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.sequence=[],t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1;for(let s in t.strings)t.sequence[s]=s;t.currentElContent=this.getCurrentElContent(t),t.autoInsertCss=t.options.autoInsertCss,this.appendAnimationCss(t)}getCurrentElContent(t){let s="";return s=t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent}appendAnimationCss(t){if(!t.autoInsertCss)return;if(!t.showCursor&&!t.fadeOut)return;if(document.querySelector("[data-typed-js-css]"))return;let s=document.createElement("style");s.type="text/css",s.setAttribute("data-typed-js-css",!0);let e="";t.showCursor&&(e+="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),t.fadeOut&&(e+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),0!==s.length&&(s.innerHTML=e,document.body.appendChild(s))}};let r=new class{typeHtmlChars(t,s,e){if("html"!==e.contentType)return s;const i=t.substr(s).charAt(0);if("<"===i||"&"===i){let e="";for(e="<"===i?">":";";t.substr(s+1).charAt(0)!==e&&!(++s+1>t.length););s++}return s}backSpaceHtmlChars(t,s,e){if("html"!==e.contentType)return s;const i=t.substr(s).charAt(0);if(">"===i||";"===i){let e="";for(e=">"===i?"<":"&";t.substr(s-1).charAt(0)!==e&&!(--s<0););s--}return s}};class o{constructor(t,s){n.load(this,s,t),this.begin()}toggle(){this.pause.status?this.start():this.stop()}stop(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}start(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}destroy(){this.reset(!1),this.options.onDestroy(this)}reset(t=!0){clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}begin(){this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(()=>{this.currentElContent&&0!==this.currentElContent.length?this.backspace(this.currentElContent,this.currentElContent.length):this.typewrite(this.strings[this.sequence[this.arrayPos]],this.strPos)},this.startDelay)}typewrite(t,s){this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));const e=this.humanizer(this.typeSpeed);let i=1;!0!==this.pause.status?this.timeout=setTimeout(()=>{s=r.typeHtmlChars(t,s,this);let e=0,n=t.substr(s);if("^"===n.charAt(0)&&/^\^\d+/.test(n)){let i=1;i+=(n=/\d+/.exec(n)[0]).length,e=parseInt(n),this.temporaryPause=!0,this.options.onTypingPaused(this.arrayPos,this),t=t.substring(0,s)+t.substring(s+i),this.toggleBlinking(!0)}if("`"===n.charAt(0)){for(;"`"!==t.substr(s+i).charAt(0)&&!(s+ ++i>t.length););const e=t.substring(0,s),n=t.substring(e.length+1,s+i),r=t.substring(s+i+1);t=e+n+r,i--}this.timeout=setTimeout(()=>{this.toggleBlinking(!1),s>=t.length?this.doneTyping(t,s):this.keepTyping(t,s,i),this.temporaryPause&&(this.temporaryPause=!1,this.options.onTypingResumed(this.arrayPos,this))},e)},e):this.setPauseStatus(t,s,!0)}keepTyping(t,s,e){0===s&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),s+=e;const i=t.substr(0,s);this.replaceText(i),this.typewrite(t,s)}doneTyping(t,s){this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout(()=>{this.backspace(t,s)},this.backDelay))}backspace(t,s){if(!0===this.pause.status)return void this.setPauseStatus(t,s,!0);if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);const e=this.humanizer(this.backSpeed);this.timeout=setTimeout(()=>{s=r.backSpaceHtmlChars(t,s,this);const e=t.substr(0,s);if(this.replaceText(e),this.smartBackspace){let t=this.strings[this.arrayPos+1];t&&e===t.substr(0,s)?this.stopNum=s:this.stopNum=0}s>this.stopNum?(s--,this.backspace(t,s)):s<=this.stopNum&&(this.arrayPos++,this.arrayPos===this.strings.length?(this.arrayPos=0,this.options.onLastStringBackspaced(),this.shuffleStringsIfNeeded(),this.begin()):this.typewrite(this.strings[this.sequence[this.arrayPos]],s))},e)}complete(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}setPauseStatus(t,s,e){this.pause.typewrite=e,this.pause.curString=t,this.pause.curStrPos=s}toggleBlinking(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))}humanizer(t){return Math.round(Math.random()*t/2)+t}shuffleStringsIfNeeded(){this.shuffle&&(this.sequence=this.sequence.sort(()=>Math.random()-.5))}initFadeOut(){return this.el.className+=` ${this.fadeOutClass}`,this.cursor&&(this.cursor.className+=` ${this.fadeOutClass}`),setTimeout(()=>{this.arrayPos++,this.replaceText(""),this.strings.length>this.arrayPos?this.typewrite(this.strings[this.sequence[this.arrayPos]],0):(this.typewrite(this.strings[0],0),this.arrayPos=0)},this.fadeOutDelay)}replaceText(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}bindFocusEvents(){this.isInput&&(this.el.addEventListener("focus",t=>{this.stop()}),this.el.addEventListener("blur",t=>{this.el.value&&0!==this.el.value.length||this.start()}))}insertCursor(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}$(document).ready(function(){$(".owl-carousel").owlCarousel({items:1});new o(".element",{strings:["i'm islam abdelkarim.","i'm a web developer.","i'm a handballer."],typeSpeed:60,backSpeed:20,backDelay:3e3,smartBackspace:!0,fadeout:!0,loop:!0});const t=document.querySelector(".navbar");document.addEventListener("scroll",function(s){document.documentElement.scrollTop>30?(t.classList.add("nav-scroll-bottom"),t.classList.remove("nav-scroll-top")):(t.classList.add("nav-scroll-top"),t.classList.remove("nav-scroll-bottom"))});const s=$(".works .grid");$(".sub-nav a").click(function(){$(this).siblings(".active").removeClass("active"),$(this).addClass("active");let t=$(this).data("target");s.isotope({filter:t})}),$("body").scrollspy({target:".navbar",offset:50}),$("#navbar-example .navbar-nav a").click(function(t){let s=this.hash;t.preventDefault(),$("html, body").animate({scrollTop:$(s).offset().top},1500,"easeInOutExpo",function(){window.location.hash=s})}),$(".img-zoom").magnificPopup({type:"image",gallery:{enabled:!0}})});const a=document.querySelectorAll("img[data-lazy]"),u=new IntersectionObserver((t,s)=>{t.forEach(t=>{if(t.isIntersecting){const s=t.target;u.unobserve(s);const e=s.getAttribute("data-lazy");s.setAttribute("src",e)}})});a.forEach(t=>u.observe(t))}]);