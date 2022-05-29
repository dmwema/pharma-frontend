<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>

		<!-- Searchable Datatable card -->
		<a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
			<template #title>
				<h5 class="font-semibold">Tous les cours qui vous sont attribués en G1 Informatique</h5>
			</template>

			<div class="mx-25">
				<a-row type="flex" :gutter="24">
					<a-col :span="24" :md="12">
						<a-select v-model="pageSize2" @change="onPageSize2Change" style="width: 70px">
							<a-select-option value="5">5</a-select-option>
							<a-select-option value="10">10</a-select-option>
							<a-select-option value="15">15</a-select-option>
							<a-select-option value="20">20</a-select-option>
							<a-select-option value="25">25</a-select-option>
						</a-select>
						<label for="" class="ml-10">entries per page</label>
					</a-col>
					<a-col :span="24" :md="12" class="text-right">
    					<a-input-search placeholder="input search text" style="max-width: 200px;" v-model="query" @change="onSearchChange" />
					</a-col>
				</a-row>
			</div>
			
			<a-table class="mt-20" :columns="columns2" :data-source="data2" :pagination="{pageSize: pageSize2,}" />
		</a-card>
		<!-- / Searchable Datatable card -->
		
	</div>

</template>

<script>
	
	import Vuex from 'vuex'

	// Second table's list of columns.
	const columns2 = [
		{
			title: '#',
			dataIndex: 'id',
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'ITITULÉ',
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'PONDERATION',
			dataIndex: 'ponderation',
			sortDirections: ['descend', 'ascend'],
			sorter: (a, b) => a.position - b.position,
		}
	];
	
	// Second table's list of rows.
	const data2 = [
	] ;

	export default {
		components: {
		},
		data() {
			return {

				// Second table's list of columns.
				columns2,

				// First table's number of rows per page.
				pageSize: 10,

				// Second table's number of rows per page.
				pageSize2: 10,
				
				// Second table's search query.
				query: '',

			}
		},
		methods: {

			// Event handler for first table's size change.
			onPageSizeChange() {
				this.pageSize = parseInt( this.pageSize ) ;
			},

			// Event handler for second table's size change.
			onPageSize2Change() {
				this.pageSize2 = parseInt( this.pageSize2 ) ;
			},

			// Event handler for second table's search.
			onSearchChange() {
				if( this.query.length > 0 ) {
					this.data2 = data2.filter( (row) => {
						for( const key in row ) {
							if( row[ key ]
								.toString()
								.toLowerCase()
								.includes( this.query.trim().toLowerCase() ) )
								return true;
						}
						return false;
					}) ;
				}
				else {
					this.data2 = data2 ;
				}
			},
			
		},
		computed: {
			...Vuex.mapGetters({
				data2: 'getCourses',
			}),
		},
		mounted() {
			this.$store.dispatch('profCourses')
		}
	}

</script>

<style lang="scss">
</style>