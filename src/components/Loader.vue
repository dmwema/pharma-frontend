<template>
  <div class="loaderBg">
    <div id="wifi-loader">
      <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
      </svg>
      <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
      </svg>
      <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
      </svg>
      <div class="text" data-text="Chargément..."></div>
    </div>
  </div>
</template>

<script>  
export default ({
		data() {
			return {
				showLoader: true,
			}
		}, 
    mounted() {
      console.log('loader')
    }
	})
</script>

<style>
.loaderBg {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#wifi-loader {
  --background: #62ABFF;
  --front-color: #1890FF;
  --back-color: #C3C8DE;
  --text-color: #414856;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
#wifi-loader svg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
#wifi-loader svg circle {
  position: absolute;
  fill: none;
  stroke-width: 6px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(-100deg);
  transform-origin: center;
}
#wifi-loader svg circle.back {
  stroke: var(--back-color);
}
#wifi-loader svg circle.front {
  stroke: var(--front-color);
}
#wifi-loader svg.circle-outer {
  height: 86px;
  width: 86px;
}
#wifi-loader svg.circle-outer circle {
  stroke-dasharray: 62.75 188.25;
}
#wifi-loader svg.circle-outer circle.back {
  -webkit-animation: circle-outer 1.8s ease infinite 0.3s;
          animation: circle-outer 1.8s ease infinite 0.3s;
}
#wifi-loader svg.circle-outer circle.front {
  -webkit-animation: circle-outer 1.8s ease infinite 0.15s;
          animation: circle-outer 1.8s ease infinite 0.15s;
}
#wifi-loader svg.circle-middle {
  height: 60px;
  width: 60px;
}
#wifi-loader svg.circle-middle circle {
  stroke-dasharray: 42.5 127.5;
}
#wifi-loader svg.circle-middle circle.back {
  -webkit-animation: circle-middle 1.8s ease infinite 0.25s;
          animation: circle-middle 1.8s ease infinite 0.25s;
}
#wifi-loader svg.circle-middle circle.front {
  -webkit-animation: circle-middle 1.8s ease infinite 0.1s;
          animation: circle-middle 1.8s ease infinite 0.1s;
}
#wifi-loader svg.circle-inner {
  height: 34px;
  width: 34px;
}
#wifi-loader svg.circle-inner circle {
  stroke-dasharray: 22 66;
}
#wifi-loader svg.circle-inner circle.back {
  -webkit-animation: circle-inner 1.8s ease infinite 0.2s;
          animation: circle-inner 1.8s ease infinite 0.2s;
}
#wifi-loader svg.circle-inner circle.front {
  -webkit-animation: circle-inner 1.8s ease infinite 0.05s;
          animation: circle-inner 1.8s ease infinite 0.05s;
}
#wifi-loader .text {
  position: absolute;
  bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: lowercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.2px;
}
#wifi-loader .text::before, #wifi-loader .text::after {
  content: attr(data-text);
}
#wifi-loader .text::before {
  color: var(--text-color);
}
#wifi-loader .text::after {
  color: var(--front-color);
  -webkit-animation: text-animation 3.6s ease infinite;
          animation: text-animation 3.6s ease infinite;
  position: absolute;
  left: 0;
}

@-webkit-keyframes circle-outer {
  0% {
    stroke-dashoffset: 25;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 301;
  }
  80% {
    stroke-dashoffset: 276;
  }
  100% {
    stroke-dashoffset: 276;
  }
}

@keyframes circle-outer {
  0% {
    stroke-dashoffset: 25;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 301;
  }
  80% {
    stroke-dashoffset: 276;
  }
  100% {
    stroke-dashoffset: 276;
  }
}
@-webkit-keyframes circle-middle {
  0% {
    stroke-dashoffset: 17;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 204;
  }
  80% {
    stroke-dashoffset: 187;
  }
  100% {
    stroke-dashoffset: 187;
  }
}
@keyframes circle-middle {
  0% {
    stroke-dashoffset: 17;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 204;
  }
  80% {
    stroke-dashoffset: 187;
  }
  100% {
    stroke-dashoffset: 187;
  }
}
@-webkit-keyframes circle-inner {
  0% {
    stroke-dashoffset: 9;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 106;
  }
  80% {
    stroke-dashoffset: 97;
  }
  100% {
    stroke-dashoffset: 97;
  }
}
@keyframes circle-inner {
  0% {
    stroke-dashoffset: 9;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 106;
  }
  80% {
    stroke-dashoffset: 97;
  }
  100% {
    stroke-dashoffset: 97;
  }
}
@-webkit-keyframes text-animation {
  0% {
    -webkit-clip-path: inset(0 100% 0 0);
            clip-path: inset(0 100% 0 0);
  }
  50% {
    -webkit-clip-path: inset(0);
            clip-path: inset(0);
  }
  100% {
    -webkit-clip-path: inset(0 0 0 100%);
            clip-path: inset(0 0 0 100%);
  }
}
@keyframes text-animation {
  0% {
    -webkit-clip-path: inset(0 100% 0 0);
            clip-path: inset(0 100% 0 0);
  }
  50% {
    -webkit-clip-path: inset(0);
            clip-path: inset(0);
  }
  100% {
    -webkit-clip-path: inset(0 0 0 100%);
            clip-path: inset(0 0 0 100%);
  }
}
</style>