<!-- 
	This is the default layout, used in sign-in and sign-up pages.
 -->

<template>
	<div style="position: relative">
		<div class="loader" :style="loaderBg" v-if="showLoader">
			<h1 class="loader-title">Faculté de pharmacie</h1>
			<p>Lorem, ipsum  Accusamus eveniet fugiat, necessitatibus assumenda dicta harum impedit expedita distinctio dolores repudiandae qui.</p>
			<div class="loader-img">
				<img src="images/loader.gif" alt="loader">
			</div>
			<p style="margin-top:20px">Chargement...</p>
		</div>
		<!-- Default Layout -->
		<a-layout class="layout-default" id="layout-default" :class="[layoutClass]">

			<!-- Layout Header ( Navbar )
			<DefaultHeader></DefaultHeader>
			 / Layout Header ( Navbar ) -->


			<!-- Page Content -->
			<a-layout-content>
				<router-view />
			</a-layout-content>
			<!-- / Page Content -->

		</a-layout>
		<!-- / Default Layout -->

	</div>
</template>

<script>

	import DefaultHeader from '../components/Headers/DefaultHeader' ;
	import DefaultFooter from '../components/Footers/DefaultFooter' ;

	export default ({
		components: {
			DefaultHeader,
			DefaultFooter,
		},
		data() {
			return {
				loaderBg: `background: linear-gradient(to top right, rgba(30, 55, 100, .5), rgba(8, 6, 6, .8)), url('images/bg-loader.jpeg')`,
				showLoader: true,
			}
		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass ;
			}, 
		},
		methods: {
			closeLoader () {
				setTimeout(()=>{
					this.showLoader = false
				},3000);
			}
		},
		created() {
			this.$eventHub.$on(this.closeLoader());
		},
	})
</script>

<style lang="scss">
	.loader {
		width: 100%;
		height: 100%;
		z-index: 100;
		position: absolute;
		background-size: cover !important;
		background-repeat: no-repeat !important;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.loader .loader-title {
		color: #fff;
		text-transform: uppercase;
	}

	.loader p {
		color: #fff;
		font-size: 1rem;
		width: 600px;
		opacity: .8;
		max-width: 90%;
	}

	.loader .loader-img {
		width: 70px;
		margin-top: 20px;
	}

	.loader .loader-img img {
		width: 100%;
	}
</style>