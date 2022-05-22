<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <!-- Test List header -->
				<a-row type="flex" :gutter="24">
					<a-col :span="12" class="mb-24">
               			<a-button @click="showModal"><a-icon type="plus-circle" theme="outlined" />ENREGISTRER UN COURS</a-button>
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
						:data-source="data"
						:pagination="{pageSize: pageSize,}"
					>

						<template slot="id" slot-scope="id">#{{ id }}</template>


						<template slot="actions"  slot-scope="id">
							<a-button @click="deleteRow(id)" icon="delete" type="danger" class="btn-status border-danger mr-5">
								Suppr.
							</a-button>	
							<a-button @click="showEditModal(id)" icon="edit" type="primary" class="btn-status border-primary mr-5">
								Modif.
							</a-button>		
						</template>	

					</a-table>
					<!-- / Orders table -->

				</a-card>
				<!-- / Test List card -->
        
        <a-modal v-model="visible" title="Enrégistrer un cours" @ok="handleOk">
            <a-form :form="form" class="row">
				<a-form-item class="mb-10 col-md-6" label="Intitulé" :colon="false">
					<a-input 
						v-decorator="[
							'title',
							{ rules: [{ required: true, message: 'Ce champ est réquis' }] },
						]" type="text" placeholder="Intitulé du cours" />
				</a-form-item>

				<a-form-item class="mb-10" label="Pondération" :colon="false">
					<a-input 
						v-decorator="[
							'ponderation',
							{ rules: [{ required: true, message: 'Ce champ est requis' }] },
						]" type="number" placeholder="Pondération"/>
				</a-form-item>

				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'promotion_id',
							{ rules: [{ required: true, message: 'Ce champ est requis' }],
							initialValue: 1 },
						]" type="hidden"/>
				</a-form-item>
 
				<a-form-item label="Professeur">
					<a-select 
						v-decorator="[
							'professor_id',
							{ rules: [{ required: true, message: 'Veuillez selectionner un sexe!' }] },
						]"
						placeholder="Selectionnez un professeur parmis ceux enrégistrés"
					>
						<a-select-option :value="prof.id" v-for="prof in profs" :key="prof.id">
						{{ prof.fullname }}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-form>
        </a-modal>	
        
        <a-modal v-model="visible2" title="Modifier les information du cours" @ok="handleOk2">
            <a-form :form="form_edit" class="row">
				<a-form-item class="mb-10 col-md-6" label="Intitulé" :colon="false">
					<a-input 
						v-decorator="[
							'titile',
							{ 
								rules: [{ required: true, message: 'Ce champ est réquis' }],
								initialValue: selectedCourse.title
							},
						]" type="text" placeholder="Intitulé du cours"/>
				</a-form-item>

				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'id',
							{ rules: [{ required: true, message: 'Ce champ est requis' }],
							initialValue: selectedCourse.id },
						]" type="hidden"/>
				</a-form-item>

				<a-form-item class="mb-10" label="Pondération" :colon="false">
					<a-input 
						v-decorator="[
							'ponderation',
							{ 
								rules: [{ required: true, message: 'Ce champ est requis' }],
								initialValue: selectedCourse.ponderation
							},
						]" type="text" placeholder="Pondération"/>
				</a-form-item>
 
				<a-form-item label="Professeur">
					<a-select 
						v-decorator="[
							'professor',
							{ rules: [{ required: true, message: 'Veuillez selectionner un sexe!' }] },
						]"
						placeholder="Selectionnez un professeur parmis ceux enrégistrés"
					>
						<a-select-option :value="prof.id" v-for="prof in profs" :key="prof.id">
						{{ prof.fullname }}
						</a-select-option>
					</a-select>
				</a-form-item>
					
			</a-form>
        </a-modal>
		
	</div>

</template>

<script>

	import store from '../../store/fac'
	import Vuex from 'vuex'
	import Api from '../../apis/Api'

	// Table columns
	const columns = [
		{
			title: 'ID',
			dataIndex: 'key',
			sorter: (a, b) => a.key - b.key,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'id' },
		},
		{
			title: 'INTITULÉ',
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'PONDÉRATION',
			dataIndex: 'ponderation',
			sorter: (a, b) => stringSorter(a, b, 'ponderation'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'PROFESSEUR',
			dataIndex: 'professor',
			sorter: (a, b) => stringSorter(a, b, 'professor'),
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'name' },
		},
		{
			title: '',
			dataIndex: 'id',
			scopedSlots: { customRender: 'actions' },
		},
	];

	// Table rows
	const data = [
	];

	export default {
		components: {
		},
		data() {
			return {
				
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

				//modal visibility
      			visible2: false,
				
				formLayout: 'horizontal',
      			
				form: this.$form.createForm(this, { name: 'coordinated' }),
      			
				form_edit: this.$form.createForm(this, { name: 'editform' }),

				// Table's selected rows
      			selectedRowKeys: [],

			}
		},
		methods: {
			...Vuex.mapActions({
				editSelectedCourse: 'editSelectedCourse',
				addCourseStore: 'addCourse',
				editCourseStore: 'editCourse',
				deleteCourse: 'deleteCourse',
			}),

			deleteRow(id) {
				this.editSelectedCourse(id)
				this.$swal.fire({
					title: "Êtes-vous sûr de vouloir supprimer ce cours ?",
					text: "Une fois supprimées, vous n'allez plus récuperer ces informations",
					icon: "warning",
					showDenyButton: true,
					denyButtonText: `Supprimer`,
					confirmButtonText: 'Annuler',
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					} else if (result.isDenied) {
						this.deleteCourse(id)
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

			// Export table in CSV format.
			csvExport(arrData) {
				let csvContent = "data:text/csv;charset=utf-8,";
				csvContent += [
					Object.keys(arrData[0]).join("|"),
					...arrData.map(item => Object.values(item).join("|"))
				]
					.join("\n")
					.replace(/(^\[)|(\]$)/gm, "");

				const data = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", data);
				link.setAttribute("download", "muse-dashboard-csv.csv");
				link.click();
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

			showEditModal(id) {
				this.editSelectedCourse(id)
				this.visible2 = true;
			},
			
			handleOk(e) {
				e.preventDefault();

				const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: false,
					didOpen: (toast) => {
						toast.addEventListener('mouseenter', this.$swal.stopTimer)
						toast.addEventListener('mouseleave', this.$swal.resumeTimer)
					}
				})

				this.form.validateFields((err, values) => {
					this.visible = false;
					if ( !err ) {
						this.addCourseStore(values)
					}
				});
			},
			handleOk2(e) {
				e.preventDefault();  
				const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: false,
					didOpen: (toast) => {
						toast.addEventListener('mouseenter', this.$swal.stopTimer)
						toast.addEventListener('mouseleave', this.$swal.resumeTimer)
					}
				})

				this.form_edit.validateFields((err, values) => {
					this.visible2 = false;
					if ( !err ) {
						this.editCourseStore(values)
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

			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
					console.log('Received values of form: ', values);
					}
				});
			},
						
		},

		computed: {
			...Vuex.mapGetters({
				data: 'courses',
				profs: 'profs',
				profsCount: 'coursesCount',
				selectedCourse: 'selectedCourse',
			}),
		},

		created() {
    		this.$store.dispatch('getCourses')
    		this.$store.dispatch('getProfs')
		}
	}
</script>

<style lang="scss">
</style>