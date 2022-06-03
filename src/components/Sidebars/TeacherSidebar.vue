<template>
	
	<!-- Main Sidebar -->
	<a-layout-sider
		collapsible
		class="sider-primary"
		breakpoint="lg"
		collapsed-width="0"
		width="250px"
		:collapsed="sidebarCollapsed"
		@collapse="$emit('toggleSidebar', ! sidebarCollapsed)"
		:trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]"
		theme="light"
		:style="{ backgroundColor: 'transparent',}">
			<div class="brand"><img src="images/logo-ct-black.png" alt="">
				<span>Fac Pharmacie</span><br>
				<b>Professeur {{ user.professor.firstname + " " + user.professor.lastname }}</b>
			</div>
			<hr>

			<!-- Sidebar Navigation Menu -->
			<a-menu theme="light" mode="inline"
      			:open-keys="openKeys"
				@openChange="onOpenChange">
				<a-menu-item>
					<router-link to="/t/dashboards/">

					<a href="#" style="padding-left:0">
						<span class="icon">
							<a-icon type="read" theme="filled" class="m-0" />
						</span>
						<span class="label">Tableau de bord</span>
					</a>
					</router-link>
				</a-menu-item>

				<a-sub-menu key="courses" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="appstore" theme="filled" class="m-0" />
						</span>
						<span class="label">Cours</span>
					</span>
					<a-menu-item-group>
						<a-menu-item v-for="promotion in promotions" :key="promotion.id"> 
							<router-link to="/t/courses">
								<span class="label">{{ promotion.name }}</span>
							</router-link>
						</a-menu-item>
					</a-menu-item-group>
				</a-sub-menu>

				<a-sub-menu key="tests" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="appstore" theme="filled" class="m-0" />
						</span>
						<span class="label">Epreuves</span>
					</span>
					<a-menu-item-group>						
						<a-menu-item v-for="promotion in promotions" :key="promotion.id"> 
							<router-link to="/t/epreuves">
								<span class="label">{{ promotion.name }}</span>
							</router-link>
						</a-menu-item>
					</a-menu-item-group>
				</a-sub-menu>

				<a-sub-menu key="ratings" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="appstore" theme="filled" class="m-0" />
						</span>
						<span class="label">Cotes</span>
					</span>
					<a-menu-item-group>
						<a-menu-item v-for="promotion in promotions" :key="promotion.id"> 
							<router-link to="/t/ratings">
								<span class="label">{{ promotion.name }}</span>
							</router-link>
						</a-menu-item>
					</a-menu-item-group>
				</a-sub-menu>	
			</a-menu>
			<!-- / Sidebar Navigation Menu -->
			<hr>

			<!-- Sidebar Navigation Menu -->
			<a-menu theme="light" mode="inline">
				<a-sub-menu key="courses" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="appstore" theme="filled" class="m-0" />
						</span>
						<span class="label">Délibération</span>
					</span>
					<a-menu-item-group>
						<a-menu-item v-for="promotion in promotions" :key="promotion.id"> 
							<router-link :to="'/t/deliberation/' + promotion.id">
								<span class="label">{{ promotion.name }}</span>
							</router-link>
						</a-menu-item>
					</a-menu-item-group>
				</a-sub-menu>

				<a-sub-menu key="tests" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="appstore" theme="filled" class="m-0" />
						</span>
						<span class="label">Jury</span>
					</span>
					<a-menu-item-group>						
						<a-menu-item v-for="promotion in promotions" :key="promotion.id"> 
							<router-link :to="'/t/jury/'+ promotion.id + '/' + user.professor.id">
								<span class="label">{{ promotion.name }}</span>
							</router-link>
						</a-menu-item>
					</a-menu-item-group>
				</a-sub-menu>

			</a-menu>
			<!-- / Sidebar Navigation Menu -->
	</a-layout-sider>
	<!-- / Main Sidebar -->

</template>

<script>
	import Vuex from 'vuex'

	export default ({
		props: {
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},
			
			// Main sidebar color.
			sidebarColor: {
				type: String,
				default: "primary",
			},
			
			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
		},
		data() {
			return {
      			rootSubmenuKeys: ['dashboards', 'courses', 'tests', 'rating', 'deliberation'],
				openKeys: this.$route.meta.sidebarMap,
				aaa: this.$route.meta
			}
		},
		methods: {
			onOpenChange(openKeys)
			{
				if (this.openKeys == undefined) {
					this.openKeys = this.$route.meta.sidebarMap
				} 
				
				const latestOpenKey = openKeys.find( key => this.openKeys.indexOf( key ) === -1) ;

				if ( this.rootSubmenuKeys.indexOf( latestOpenKey ) === -1 )
				{
					this.openKeys = openKeys;
				}
				else
				{
					this.openKeys = latestOpenKey ? [ latestOpenKey ] : [] ;
				}
			},
		},

		computed: {
			...Vuex.mapGetters({
				user: 'auth/user',
				promotions: 'promotions',
			}),
		},

		created() {
    		this.$store.dispatch('getPromotions')
		}
	})

</script>
