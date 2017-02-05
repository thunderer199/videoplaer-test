!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=n(1),o=i(a);!function(){function e(){var e=document.querySelector(".player");new o.default(e)}document.addEventListener("DOMContentLoaded",e)}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a,o,r;Object.defineProperty(t,"__esModule",{value:!0}),a=function(){function e(e,t){var n,i;for(n=0;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(2),n(3),r=function(){function e(t){i(this,e),this.paused=!0,this.playerNode=t,this.domComponents={player:t.querySelector("video"),canvas:t.querySelector(".canvas_wrapper canvas"),playPause:t.querySelector(".play_pause"),playback_viewed:t.querySelector(".playback .filled"),playback:t.querySelector(".playback-click_area"),timeContainer:t.querySelector(".time-block"),timeText:t.querySelector(".time"),volume_container:t.querySelector(".volume"),volume_bars:t.querySelectorAll(".volume_bar"),fullscreen:t.querySelector(".fullscreen")},this.linkEvents()}return a(e,[{key:"linkEvents",value:function(){var e=this,t=this.domComponents;(0,o.addListeners)(t.player,["loadeddata","seeked"],this.generatePreview.bind(this)),(0,o.clickBind)(t.playPause,this.playPauseListener.bind(this)),t.player.addEventListener("timeupdate",this.timeUpdateListener.bind(this)),t.player.addEventListener("volumechange",this.volumeChangedListener.bind(this)),(0,o.addListeners)(t.playback,["mousemove","mouseenter","touchmove"],this.showAndUpdateTimeMark.bind(this)),(0,o.addListeners)(t.playback,["mouseleave","touchend"],this.hideTimeMark.bind(this)),(0,o.clickBind)(t.playback,this.setupPlaybackTime.bind(this)),[].forEach.call(t.volume_bars,function(t){return(0,o.clickBind)(t,e.volumeBarListener.bind(e))}),(0,o.clickBind)(t.fullscreen,this.openInFullScreen.bind(this))}},{key:"playPauseListener",value:function(){this.paused?this.play():this.pause()}},{key:"timeUpdateListener",value:function(){var e=this.domComponents.player,t=e.currentTime/e.duration*100;this.domComponents.playback_viewed.style.width=t+"%",e.ended&&this.pause()}},{key:"showAndUpdateTimeMark",value:function(t){var n,i,a,o,r,s=t.pageX||t.changedTouches[0].pageX,u=this.domComponents.player;this.domComponents.timeContainer.style.visibility="visible",n=this.domComponents.playback.getBoundingClientRect(),i=s-n.left,a=i/n.width*100,this.domComponents.timeContainer.style.transform="translateX("+i+"px)",o=100/u.duration,r=a/o,a>0&&a<=100?this.domComponents.timeText.innerHTML=e.formatTime(r):this.hideTimeMark()}},{key:"hideTimeMark",value:function(){this.domComponents.timeContainer.style.visibility="hidden"}},{key:"setupPlaybackTime",value:function(e){var t=e.pageX||e.changedTouches[0].pageX,n=this.domComponents.player,i=this.domComponents.playback.getBoundingClientRect(),a=i.left,o=i.width,r=(t-a)/o*100,s=100/n.duration;n.currentTime=r/s}},{key:"volumeBarListener",value:function(e){var t=e.currentTarget,n=t.getAttribute("data-level")/100;this.setVolumeLevel(n)}},{key:"setVolumeLevel",value:function(e,t){var n,i,a,o;for(void 0===t&&(t=!0),n=this.domComponents.player,n.volume=e,n.muted&&t?n.muted=!1:n.muted&&!t&&(e=0),i=0;i<this.domComponents.volume_bars.length;i++)a=this.domComponents.volume_bars[i],o=a.getAttribute("data-level")/100,o<=e?a.classList.add("filled"):a.classList.remove("filled")}},{key:"volumeChangedListener",value:function(){var e=this.domComponents.player;this.setVolumeLevel(e.volume,!1)}},{key:"openInFullScreen",value:function(){var e,t,n=["requestFullscreen","mozRequestFullScreen","webkitRequestFullscreen","msRequestFullscreen"],i=this.domComponents.player;for(e=0;e<n.length;e++)t=n[e],t in i&&i[t].call(i)}},{key:"play",value:function(){this.paused=!1,this.domComponents.playPause.classList.add("played"),this.domComponents.playPause.classList.remove("paused"),this.domComponents.player.play(),this.lastFrame=requestAnimationFrame(this.generatePreview.bind(this))}},{key:"pause",value:function(){this.paused=!0,this.domComponents.playPause.classList.add("paused"),this.domComponents.playPause.classList.remove("played"),this.domComponents.player.pause(),cancelAnimationFrame(this.lastFrame)}},{key:"generatePreview",value:function(){var e,t,n,i=this.domComponents.canvas,a=this.domComponents.player,o=i.getContext("2d");o.filter="blur(2px)",e=i.width,t=i.height,n=a.getBoundingClientRect(),o.drawImage(a,0,-(n.height+50),e,n.height+t+30),a.paused||(this.lastFrame=requestAnimationFrame(this.generatePreview.bind(this)))}}],[{key:"formatTime",value:function(e){e=+e.toFixed();var t=e%60+"s";return e>=60&&(t=(e/60).toFixed()+"m "+t),e>=3600&&(t=(e/3600).toFixed()+"h "+t),t}}]),e}(),t.default=r},function(e,t,n){"use strict";function i(e,t){if(!o())return void e.addEventListener("click",t);var n=null;e.addEventListener("touchstart",function(e){n=e.currentTarget}),e.addEventListener("touchend",function(e){n&&e.currentTarget===n&&t.apply(null,arguments)})}function a(e,t,n){t.forEach(function(t){return e.addEventListener(t,n)})}function o(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}}Object.defineProperty(t,"__esModule",{value:!0}),t.clickBind=i,t.addListeners=a},function(e,t){},function(e,t,n){e.exports=n(0)}]);