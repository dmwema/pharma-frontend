<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>

	export default ({
		computed: {
			layout() {
				console.log(this.$route.meta.layout);
				return "layout-" + ( this.$route.meta.layout || 'default' ).toLowerCase() ;
			}
		},
	})
	
</script>

<style lang="scss">
</style>