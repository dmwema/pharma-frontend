<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app">
		<component :is="layout">
			<Loader v-if="isLoading"></Loader>
			<router-view />
		</component>
	</div>
</template>

<script>
	import Loader from '@/components/Loader'

	export default ({
		components: {
			Loader
		},
		data() {
			return {
				isLoading: false,
			}
		},
		computed: {
			layout() {
				return "layout-" + ( this.$route.meta.layout || 'default' ).toLowerCase() ;
			}
		},
		methods: {
			hideLoader: function () {
				if(this.loader === true)
					this.isLoaidng = false
			},
			showLoader () {
				if (this.loader === false)
					this.isLoaidng = true
			},

		},
	})
	
</script>

<style lang="scss">
</style>