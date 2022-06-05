<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane v-for="course in courses" :key="course.id" :tab="course.title + ' (' + course.annual_works.length + ')'">
				<!-- Test List header -->
				<a-row type="flex" :gutter="24">
					<a-col :span="12" class="mb-24">
               			<a-button @click="create_test(course.id)"><a-icon type="plus-circle" theme="outlined"/>ENREGISTRER UNE EPREUVE</a-button>
					</a-col>
				</a-row>
				<!-- / Test List header -->

				<!-- Test List card -->
				<a-card :bordered="true" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
					<!-- Table search -->
					<div class="mx-25">
						<a-row type="flex" :gutter="24">
							<a-col :span="24" class="text-right">
								<a-input-search placeholder="Rechercher" style="max-width: 200px;" v-model="query" @change="onSearchChange" />
							</a-col>
						</a-row>
					</div>
					<!-- / Table search -->
					
					<!-- Test table -->
					<a-table class="mt-20"
						:columns="columns"
						:data-source="course.annual_works"
						:pagination="{pageSize: pageSize,}"
					>

						<template slot="date_work" slot-scope="date_work">{{ moment(date_work).format("D MMM YYYY") }}</template>

						<template slot="actions" slot-scope="id">
							<a-button @click="deleteRow(id)" icon="delete" type="danger" class="btn-status border-danger mr-5">
								Suppr.
							</a-button>	
							<a-button @click="showEditModal" icon="edit" type="primary" class="btn-status border-primary mr-5">
								Modif.
							</a-button>		
						</template>	

					</a-table>
					<!-- / Orders table -->

				</a-card>
				<!-- / Test List card -->
            </a-tab-pane>
        </a-tabs>
        
        <a-modal v-model="visible" title="Enrégistrer une épreuve" @ok="handleOk">
            <a-form :form="form">
				<a-form-item class="mb-10" label="Date" :colon="false">
					<a-input v-decorator="[
							'date',
							{ rules: [{ required: true, message: 'Vous devez entrer une date' }] },
					]"
					type="date" placeholder="Date de l'épreuve" />
				</a-form-item>

				<a-form-item class="mb-10" label="Donnez un titre à l'épreuve" :colon="false">
					<a-input v-decorator="[
							'title',
							{ rules: [{ required: true, message: 'Vous devez entrer un intitulé' }] },
					]" 
					placeholder="Intitulé" />
				</a-form-item>

				<a-form-item class="mb-10" label="Donnez une description de l'épreuve" :colon="false">
					<a-input v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Vous devez entrer une description' }] },
					]" 
					placeholder="Description" />
				</a-form-item>

				<a-form-item class="mb-10" label="Côte maximale" :colon="false">
					<a-input type="number" v-decorator="[
						'max',
					]" 
					placeholder="Max" />
				</a-form-item>
					
			</a-form>
        </a-modal>	
		
	</div>

</template>

<script>
	let momentjs = require('moment');
	import Vuex from 'vuex'
	import axios from 'axios'

	// Table columns
	const columns = [
		{
			title: 'ID',
			dataIndex: 'key',
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'id' },
		},
		{
			title: 'DATE',
			dataIndex: 'date_work',
			sorter: (a, b) => a.date_work - b.date_work,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'date_work' },
		},
		{
			title: 'INTITULÉ',
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'title' },
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			sorter: (a, b) => a.description.length - b.description.length,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'description' },
		},
		{
			title: 'MAX',
			dataIndex: 'max',
			sorter: (a, b) => a.max.length - b.max.length,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'max' },
		},
		{
			title: '',
			dataIndex: 'id',
			scopedSlots: { customRender: 'actions' },
		},
	];
	export default {
		components: {
		},
		data() {
			return {

				current_course: null,

				moment: momentjs,

				// Table columns
				columns,

				// First table's number of rows per page.
				pageSize: 10,

				// Second table's number of rows per page.
				pageSize2: 10,
				
				// Second table's search query.
				query: '',

				//modal visibility
      			visible: false,
				
				formLayout: 'horizontal',
      			
				form: this.$form.createForm(this, { name: 'coordinated' }),

				// Table's selected rows
      			selectedRowKeys: [],

			}
		},
		methods: {

			...Vuex.mapActions({
				addTest: 'addTest',
				editSelectedCourse: 'editSelectedCourse',
				deleteTest: 'deleteTest',
			}),
			deleteRow(id) {
				this.$swal.fire({
					title: "Êtes-vous sûre ?",
					text: "Une fois supprimée, vous n'allez plus récuperer cette information",
					icon: "warning",
					showDenyButton: true,
				  	denyButtonText: `Supprimer`,
					confirmButtonText: 'Annuler',
  					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isDenied) {
					this.deleteTest(id)
				}
				})
			},
			// Event listener for input change on table search field.
			onSearchChange() {
				if( this.query.length > 0 ) {
					this.data = data.filter( (row) => {
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
					this.data = data ;
				}
			},

			// Event listener for table row selection change.
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys;
			},

			// Event handler for first table's size change.
			onPageSizeChange() {
				this.pageSize = parseInt( this.pageSize ) ;
			},

			// Event handler for second table's size change.
			onPageSize2Change() {
				this.pageSize2 = parseInt( this.pageSize2 ) ;

			},
			showModal() {
				this.visible = true;
			},

			handleSelectChange() {
				console.log('changed')
			},

			showEditModal() {
				this.visible = true;
			},
			handleOk(e) {
				e.preventDefault();
				
				this.visible = false;

				this.form.validateFields((err, values) => {
					if ( !err ) {
						this.addTest(values)
					}
				});
			},
			
			handleChange(info) {
				const status = info.file.status;
				if (status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (status === 'done') {
					this.$message.success(`${info.file.name} file uploaded successfully.`);
				} else if (status === 'error') {
					this.$message.error(`${info.file.name} file upload failed.`);
				}
			},
			
			callback(key) {
				console.log(key);
			},

			create_test(id) {
				this.editSelectedCourse(id)
				this.current_course = id
				this.showModal();
			}
						
		},
		computed: {
			...Vuex.mapGetters({
				profSelectedCourse: 'profSelectedCourse',
				courses: 'tests',
			}),
		},
		mounted() {
			this.$store.dispatch('profTests')
		},
	}
</script>

<style lang="scss">
</style>