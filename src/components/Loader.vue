<template>
	<div class="loaderbg">
		<section class="section">
			<span class="loader loader-quart"></span>
		</section>
	</div>
</template>

<script>  
export default ({
		data() {
			return {
				showLoader: true,
			}
		}
	})
</script>

<style>
	.loaderbg {
		width: 100vw;
		height: 100vh;
		display: flex;
		overflow: hidden;
		align-items: center;
		justify-content: center;
    z-index: 100;
    background-color: #FAFAFA;
    position: fixed;
    left: 0;
    right: 0
	}
	.loader {
		width: 50px;
		height: 50px;
		display: inline-block;
		vertical-align: middle;
		position: relative; }

		/* Loaders */
		.loader-quart {
		border-radius: 50px;
		border: 6px solid rgba(0, 0, 0, 0.1);
	}

	.loader-quart:after {
		content: '';
		position: absolute;
		top: -6px;
		left: -6px;
		bottom: -6px;
		right: -6px;
		border-radius: 50px;
		border: 6px solid transparent;
		border-top-color: rgba(0, 0, 0, 0.2);
		-webkit-animation: spin 1s linear infinite;
		-moz-animation: spin 1s linear infinite;
		animation: spin 1s linear infinite;}

		/* Animations */
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg); }

  to {
    -webkit-transform: rotate(360deg); } }
@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg); }

  to {
    -moz-transform: rotate(360deg); } }
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg); }

  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg); } }
@-webkit-keyframes spinreverse {
  from {
    -webkit-transform: rotate(0deg); }

  to {
    -webkit-transform: rotate(-360deg); } }
@-moz-keyframes spinreverse {
  from {
    -moz-transform: rotate(0deg); }

  to {
    -moz-transform: rotate(-360deg); } }
@keyframes spinreverse {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg); }

  to {
    -webkit-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg); } }
@-webkit-keyframes grow {
  0% {
    -webkit-transform: scaleY(0);
    opacity: 0; }

  50% {
    -webkit-transform: scaleY(1);
    opacity: 1; }

  100% {
    -webkit-transform: scaleY(0);
    opacity: 0; } }
@-moz-keyframes grow {
  0% {
    -moz-transform: scaleY(0);
    opacity: 0; }

  50% {
    -moz-transform: scaleY(1);
    opacity: 1; }

  100% {
    -moz-transform: scaleY(0);
    opacity: 0; } }
@keyframes grow {
  0% {
    -webkit-transform: scaleY(0);
    -moz-transform: scaleY(0);
    -ms-transform: scaleY(0);
    -o-transform: scaleY(0);
    transform: scaleY(0);
    opacity: 0; }

  50% {
    -webkit-transform: scaleY(1);
    -moz-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    transform: scaleY(1);
    opacity: 1; }

  100% {
    -webkit-transform: scaleY(0);
    -moz-transform: scaleY(0);
    -ms-transform: scaleY(0);
    -o-transform: scaleY(0);
    transform: scaleY(0);
    opacity: 0; } }
@-webkit-keyframes shatter {
  0% {
    -webkit-transform: scale(0); }

  50% {
    -webkit-transform: scale(0.5); }

  65% {
    -webkit-transform: scale(0.4);
    background-color: white;
    border-width: 0px; }

  90% {
    background-color: rgba(255, 255, 255, 0);
    opacity: 1; }

  100% {
    -webkit-transform: scale(1);
    border-width: 1px;
    background-color: transparent;
    opacity: 0; } }
@-moz-keyframes shatter {
  0% {
    -moz-transform: scale(0); }

  50% {
    -moz-transform: scale(0.5); }

  65% {
    -moz-transform: scale(0.4);
    background-color: white;
    border-width: 0px; }

  90% {
    background-color: rgba(255, 255, 255, 0);
    opacity: 1; }

  100% {
    -moz-transform: scale(1);
    border-width: 1px;
    background-color: transparent;
    opacity: 0; } }
@keyframes shatter {
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0); }

  50% {
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -ms-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform: scale(0.5); }

  65% {
    -webkit-transform: scale(0.4);
    -moz-transform: scale(0.4);
    -ms-transform: scale(0.4);
    -o-transform: scale(0.4);
    transform: scale(0.4);
    background-color: white;
    border-width: 0px; }

  90% {
    background-color: rgba(255, 255, 255, 0);
    opacity: 1; }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    border-width: 1px;
    background-color: transparent;
    opacity: 0; } }
	
</style>