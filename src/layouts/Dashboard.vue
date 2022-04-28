<!-- 
	This is the dashboard layout, used in dashboard, tables, billing and profile pages.
 -->

<template>
	<div>

		<!-- Dashboard Layout -->
		<a-layout class="layout-dashboard" id="layout-dashboard" :class="[navbarFixed ? 'navbar-fixed' : '', ! sidebarCollapsed ? 'has-sidebar' : '', layoutClass, sidebarMinimized ? 'sidebar-minimized' : '' ]">
			
			<!-- Main Sidebar -->
			<DashboardSidebar
				:sidebarCollapsed="sidebarCollapsed"
				:sidebarColor="sidebarColor"
				:sidebarTheme="sidebarTheme"
				@toggleSidebar="toggleSidebar"
			></DashboardSidebar>
			<!-- / Main Sidebar -->

			<!-- Layout Content -->
			<a-layout>

				<!-- Layout Header's Conditionally Fixed Wrapper -->
				<DashboardHeader
					:sidebarCollapsed="sidebarCollapsed"
					:navbarFixed="navbarFixed"
					@toggleSettingsDrawer="toggleSettingsDrawer"
					@toggleSidebar="toggleSidebar"
					@minimizeSidebar="minimizeSidebar"
				></DashboardHeader>
				<!-- / Layout Header's Conditionally Fixed Wrapper -->

				<!-- Page Content -->
				<a-layout-content>
					<router-view :navbarFixed="navbarFixed" />
				</a-layout-content>
				<!-- / Page Content -->

				<!-- Sidebar Overlay -->
				<div class="sidebar-overlay" @click="sidebarCollapsed = true" v-show="! sidebarCollapsed"></div>
				<!-- / Sidebar Overlay -->

			</a-layout>
			<!-- / Layout Content -->
			
			<!-- Settings Drawer -->
			<DashboardSettingsDrawer
				:showSettingsDrawer="showSettingsDrawer"
				:navbarFixed="navbarFixed"
				:sidebarTheme="sidebarTheme"
				@toggleSettingsDrawer="toggleSettingsDrawer"
				@toggleNavbarPosition="toggleNavbarPosition"
				@updateSidebarTheme="updateSidebarTheme"
				@updateSidebarColor="updateSidebarColor"
			></DashboardSettingsDrawer>
			<!-- / Settings Drawer -->

		</a-layout>
		<!-- / Dashboard Layout -->

	</div>
</template>

<script>

	import DashboardSidebar from '../components/Sidebars/DashboardSidebar' ;
	import DashboardHeader from '../components/Headers/DashboardHeader' ;
	import DashboardFooter from '../components/Footers/DashboardFooter' ;
	import DashboardSettingsDrawer from '../components/Sidebars/DashboardSettingsDrawer' ;

	export default ({
		components: {
			DashboardSidebar,
			DashboardHeader,
			DashboardFooter,
			DashboardSettingsDrawer,
		},
		data() {
			return {

				// Sidebar collapsed status.
				sidebarCollapsed: false,

				// Sidebar minimized status.
				sidebarMinimized: false,
				
				// Main sidebar color.
				sidebarColor: "primary",
				
				// Main sidebar theme : light, white, dark.
				sidebarTheme: "light",

				// Header fixed status.
				navbarFixed: false,

				// Settings drawer visiblility status.
				showSettingsDrawer: false,
				
			}
		},
		methods: {

			// Toggle sidebar's collapsed status.
			toggleSidebar( value ) {
				this.sidebarCollapsed = value ;
			},
			
			// Toggle sidebar's minimized status.
			minimizeSidebar( value ) {
				this.sidebarMinimized = ! this.sidebarMinimized ;
			},
			
			// Toggle ettings drawer's visiblility status.
			toggleSettingsDrawer( value ) {
				this.showSettingsDrawer = value ;
			},
			
			// Toggle navbar's fixed status.
			toggleNavbarPosition( value ) {
				this.navbarFixed = value ;
			},
			
			// Change sidebar's theme.
			updateSidebarTheme( value ) {
				this.sidebarTheme = value ;
			},
			
			// Change sidebar's color.
			updateSidebarColor( value ) {
				this.sidebarColor = value ;
			},

		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass ;
			}
		},
	})

</script>
