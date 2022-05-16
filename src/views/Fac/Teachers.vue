<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <!-- Test List header -->
				<a-row type="flex" :gutter="24">
					<a-col :span="12" class="mb-24">
               			<a-button @click="showModal"><a-icon type="plus-circle" theme="outlined" />ENREGISTRER UN PROFESSEUR</a-button>
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
        
        <a-modal v-model="visible" title="Enrégistrer un professeur" @ok="handleOk">
            <a-form :form="form" class="row">
				<a-form-item class="mb-10 col-md-6" label="Nom" :colon="false">
					<a-input 
						v-decorator="[
							'lastname',
							{ rules: [{ required: true, message: 'Ce champ est réquis' }] },
						]" type="text" placeholder="Nom du professeur" />
				</a-form-item>

				<a-form-item class="mb-10" label="Postnom" :colon="false">
					<a-input 
						v-decorator="[
							'middlename',
							{ rules: [{ required: true, message: 'Ce champ est requis' }] },
						]" type="text" placeholder="Postnom du professeur" />
				</a-form-item>

				<a-form-item class="mb-10" label="Prenom" :colon="false">
					<a-input 
						v-decorator="[
							'firstname',
							{ rules: [{ required: true, message: 'Veuillez entre l\'adresse email!' }] },
						]" type="text" placeholder="Prenom du professeur" />
				</a-form-item>

				<a-form-item class="mb-10" label="Email" :colon="false">
					<a-input 
						v-decorator="[
							'email',
							{ rules: [{ required: true, message: 'Veuillez entrer une adresse email!' }] },
						]" placeholder="Adresse email du professeur" />
				</a-form-item>

				<a-form-item label="Sexe">
					<a-select
						v-decorator="[
							'sexe',
							{ rules: [{ required: true, message: 'Veuillez selectionner un sexe!' }] },
						]"
						placeholder="Selectionnez un sex parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option value="m">
						Homme
						</a-select-option>
						<a-select-option value="f">
						Femme
						</a-select-option>
					</a-select>
				</a-form-item>
					
			</a-form>
        </a-modal>	
        
        <a-modal v-model="visible2" title="Modifier les information du professeur" @ok="handleOk2">
            <a-form :form="form_edit" class="row">
				<a-form-item class="mb-10 col-md-6" label="Nom" :colon="false">
					<a-input 
						v-decorator="[
							'lastname',
							{ 
								rules: [{ required: true, message: 'Ce champ est réquis' }],
								initialValue: selectedProf.fullname.split(' ')[0]
							},
						]" type="text" placeholder="Nom du professeur"/>
				</a-form-item>

				<a-form-item class="mb-10" label="Postnom" :colon="false">
					<a-input 
						v-decorator="[
							'middlename',
							{ 
								rules: [{ required: true, message: 'Ce champ est requis' }],
								initialValue: selectedProf.fullname.split(' ')[1]
							},
						]" type="text" placeholder="Postnom du professeur"/>
				</a-form-item>

				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'key',
							{ 
								initialValue: selectedProf.key
							},
						]" type="hidden"/>
				</a-form-item>

				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'id',
							{ 
								initialValue: selectedProf.id
							},
						]" type="hidden"/>
				</a-form-item>

				<a-form-item class="mb-10" label="Prenom" :colon="false">
					<a-input 
						v-decorator="[
							'firstname',
							{ 
								rules: [{ required: true, message: 'Veuillez entre l\'adresse email!' }] ,
								initialValue: selectedProf.fullname.split(' ')[2]
							},
						]" type="text" placeholder="Prenom du professeur"/>
				</a-form-item>

				<a-form-item class="mb-10" label="Email" :colon="false">
					<a-input 
						v-decorator="[
							'email',
							{ 
								rules: [{ required: true, message: 'Veuillez entrer une adresse email!' }],
								initialValue: selectedProf.email
							},
						]" placeholder="Adresse email du professeur"/>
				</a-form-item>

				<a-form-item label="Sexe">
					<a-select
						v-decorator="[
							'sexe',
							{ rules: [{ required: true, message: 'Veuillez selectionner un sexe!' }] },
						]"
						placeholder="Selectionnez un sex parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option value="m">
						Homme
						</a-select-option>
						<a-select-option value="f">
						Femme
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


	// Table columns
	const columns = [
		{
			title: 'ID',
			dataIndex: 'key',
			sorter: (a, b) => a.key - b.key,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'key' },
		},
		{
			title: 'Nom comptet',
			dataIndex: 'fullname',
			sorter: (a, b) => a.fullname.length - b.fullname.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => stringSorter(a, b, 'email'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'SEXE',
			dataIndex: 'sexe',
			sorter: (a, b) => a.sexe.length - b.sexe.length,
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
		created () {
		},
		store:store,
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
				editSelectedProf: 'editSelectedProf',
				addProfStore: 'addProf',
				editProfStore: 'editProf',
				deleteProf: 'deleteProf',
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
				if (result.isConfirmed) {
				} else if (result.isDenied) {
					this.deleteProf(id)
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

					Toast.fire({
						icon: 'success',
						title: 'Épreuve supprimée avec succès'
					})
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

			showEditModal(id) {
				this.editSelectedProf(id)
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
						this.addProfStore(values)
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
						this.editProfStore(values)
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
			
			handleSelectChange(value) {
			},
						
		},

		computed: {
			...Vuex.mapGetters({
				data: 'profs',
				profsCount: 'profsCount',
				selectedProf: 'selectedProf',
			}),
		}
	}
</script>

<style lang="scss">
</style>