<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
		<!-- Test List header -->
		<a-row type="flex" :gutter="24">
			<a-col :span="12" class="mb-24">
					<a-button @click="jury_toggle_status(jury)" type="success" :class="jury.status ? 'btn-status border-danger mr-5' : 'btn-status border-primary mr-5'">
						<a-icon type="caret-left" theme="outlined" />
						{{ !jury.status ? "Activer le bureau" : "Désactiver le bureau" }}
					</a-button>	
			</a-col>
		</a-row>
		<!-- / Test List header -->

		<!-- Test List card -->
		<a-card :bordered="true" :class="!jury.status ? 'btn-status border-danger header-solid mb-24': 'header-solid mb-24'" :bodyStyle="{padding: 0, paddingTop: '16px'}">
			<!-- Table search -->
			<div class="mx-25">
				<a-row type="flex" :gutter="24">
					<a-col class="mb-24 text-right">
						<a-button @click="showModal"><a-icon type="plus-circle" theme="outlined" />AJOUTER UN MEMBRE</a-button>
					</a-col>
				</a-row>
			</div>
			<!-- / Table search -->
			
			<!-- Test table -->
			<a-table class="mt-20"
				:columns="columns"
				:data-source="jury.members"
				:pagination="{pageSize: pageSize,}"
			>

				<template slot="id" slot-scope="id">#{{ id }}</template>

				<template slot="actions"  slot-scope="id">
					<a-button @click="deleteRow({prof: id, jury: jury.id, promotion: 1})" icon="delete" type="danger" class="btn-status border-danger mr-5">
						Rétirer
					</a-button>	
					<!--<a-button @click="showEditModal(id)" icon="edit" type="primary" class="btn-status border-primary mr-5">
						Modif.
					</a-button>		-->	
				</template>	

			</a-table>
			<!-- / Orders table -->

		</a-card>
		<!-- / Test List card -->
        

        <a-modal v-model="visible" title="Ajouter un membre du bureau du jury" @ok="handleOk">
            <a-form :form="form" class="row">
				<a-form-item label="Professeur">
					<a-select
						v-decorator="[
							'professor',
							{ rules: [{ required: true, message: 'Veuillez selectionner un professeur!' }] },
						]"
						placeholder="Selectionnez un professeur parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option v-for="professor in profs" :key="professor.id" :value="professor.id">
						{{ professor.fullname }}
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'jury',
							{ 
								initialValue: jury.id
							},
						]" type="hidden"/>
				</a-form-item>
				<a-form-item label="Rôle">
					<a-select
						v-decorator="[
							'role',
							{ rules: [{ required: true, message: 'Veuillez selectionner un rôle!' }] },
						]"
						placeholder="Selectionnez un rôle parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option value="1">
						Président
						</a-select-option>
						<a-select-option value="2">
						Sécretaire
						</a-select-option>
						<a-select-option value="3">
						Membre
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-form>
        </a-modal>	
        

        <a-modal v-model="visible2" title="Modifier le membre du bureau du jury" @ok="handleOk2">
            <a-form :form="form_edit" class="row">
				<a-form-item label="Professeur">
					<a-select
						v-decorator="[
							'professor',
							{ rules: [{ required: true, message: 'Veuillez selectionner un professeur!' }] },
						]"
						placeholder="Selectionnez un professeur parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option v-for="professor in profs" selected :key="professor.id" :value="professor.id">
						{{ professor.fullname }}
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item class="mb-10" :colon="false">
					<a-input 
						v-decorator="[
							'jury',
							{ 
								initialValue: jury.id
							},
						]" type="hidden"/>
				</a-form-item>
				<a-form-item label="Rôle">
					<a-select
						v-decorator="[
							'role',
							{ rules: [{ required: true, message: 'Veuillez selectionner un rôle!' }] },
						]"
						placeholder="Selectionnez un rôle parmis ceux enrégistrés"
						@change="handleSelectChange"
					>
						<a-select-option value="1">
						Président
						</a-select-option>
						<a-select-option value="2">
						Sécretaire
						</a-select-option>
						<a-select-option value="3">
						Membre
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
			scopedSlots: { customRender: 'key' },
		},
		{
			title: 'Professeur',
			dataIndex: 'fullname',
			sorter: (a, b) => a.fullname.length - b.fullname.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Rôle',
			dataIndex: 'role',
			sorter: (a, b) => stringSorter(a, b, 'email'),
			sortDirections: ['descend', 'ascend'],
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

				// genlogin() password verification
				pass_verify: ""
			}
		},
		methods: {
			...Vuex.mapActions({
				editSelectedProf: 'editSelectedProf',
				addProfStore: 'jury_addProf',
				editProfStore: 'jury_editProf',
				deleteProf: 'jury_deleteProf',
				editJury: 'editJury',
			}),

			deleteRow(data) {
				this.editSelectedProf(data.prof)
				this.$swal.fire({
					title: "Attention !",
					text: "Êtes-vous sûr de vouloir retirer le professeur " + this.selectedProf.fullname + " des membres de jury ?",
					icon: "warning",
					showDenyButton: true,
					denyButtonText: `Rétirer`,
					confirmButtonText: 'Annuler',
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					} else if (result.isDenied) {
						this.deleteProf(data)
					}
				})
			},

			jury_toggle_status(jury) {
				if (jury.status) {
					this.desable_jury(jury.id)
				} else {
					this.enable_jury(jury.id)
				}
			},

			desable_jury(id) {
				this.$swal.fire({
					title: "Attention !",
					text: "Êtes-vous sûr de vouloir desactiver ce bureau de jury ? Ceci arrêtera tout le processus de délibération",
					icon: "warning",
					customClass: {
						confirmButton: 'btn-status border-primary mr-5 ant-btn ant-btn-primary',
						denyButton: 'btn-status border-danger mr-5 ant-btn ant-btn-danger'
					},
					buttonsStyling: false,
					showDenyButton: true,
					denyButtonText: `Annuler`,
					confirmButtonText: 'Désactiver',
  					reverseButtons: true,
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					this.editJury(id)
					}
				})
			},

			enable_jury(id) {
				this.$swal.fire({
					title: "Attention !",
					text: "Êtes-vous sûr de vouloir activer ce bureau de jury ? Ceci lancera le processus de délibération. touts les professeurs concernés seront notifiés",
					icon: "warning",
					showDenyButton: true,
  					reverseButtons: true,
					customClass: {
						confirmButton: 'btn-status border-primary mr-5 ant-btn ant-btn-primary',
						denyButton: 'btn-status border-danger mr-5 ant-btn ant-btn-danger'
					},
					buttonsStyling: false,
					denyButtonText: `Annuler`,
					confirmButtonText: 'Activer',
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					this.editJury(id)
				}
				})
			},

			genLogin(id) {
				const loginSwal = this.$swal.mixin({
					customClass: {
						confirmButton: 'btn-status border-primary mr-5 ant-btn ant-btn-primary',
						cancelButton: 'btn-status border-danger mr-5 ant-btn ant-btn-danger'
					},
					buttonsStyling: false
				})
				this.editSelectedProf(id)
				loginSwal.fire({
					title: "ATTENTION",
					text: "Vous êtes au point de générer des accès de connection pour le professeur " + this.selectedProf.fullname.split(' ')[0] + " " + this.selectedProf.fullname.split(' ')[1] + " " + this.selectedProf.fullname.split(' ')[2],
					icon: "info",
					input: "password",
					preConfirm: (pass) => {
						if (pass.length === 0) {
							this.$swal.showValidationMessage(
							`Vous devez entrer votre mot de passe pour des raisons de sécurité`
							)
						} else {
						return Api.post('/admin-pass-verification', {
							id: 1,
							pass: 'password'
						})
						.then(response => {
							if (!response.data.success) {
								this.$swal.showValidationMessage(
								`${response.data.message}`
								)
							} else {
								Api.post('/generate', {
									user_id: this.selectedProf.id,
								})
								.then(response => {
									if (response.data.success) {
										this.$swal.fire(
											'Good job!',
											'You clicked the button!',
											'success'
										)		
									} else {
										this.$swal.fire({
											icon: 'error',
											title: 'Oops...',
											text: 'Les accès de connexion de ce professeur ont été déjà générés!',
										})		
									}
								})
								.catch(err => {
									this.$swal.showValidationMessage(
									`Erreur de connexion: ${err}`
									)
								})
							}
						})
						.catch(error => {
							this.$swal.showValidationMessage(
							`Erreur de connexion: ${error}`
							)
						})}
					},
  					allowOutsideClick: () => !this.$swal.isLoading(),
  					showLoaderOnConfirm: true,
					inputAttributes: {
						placeholder: 'votre mot de passe'
					},
  					reverseButtons: true,
  					showCancelButton: true,
					cancelButtonText: `Annuler`,
					confirmButtonText: 'Générer',
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					} else if (result.isDenied) {
					}
				})
			},
			// Event listener for input change on table search field.
			onSearchChange() {
				if( this.query.length > 0 ) {
					console.log(data)
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

			has_login(id) {
				data.forEach(element => {
					if (element.id === id) {
						return element.has_logins
					}
				});
				return false
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
				profs: 'profs',
				jury: 'jury',
				selectedProf: 'selectedProf',
			}),
		},

		created() {
    		this.$store.dispatch('getProfs')
    		this.$store.dispatch('getJury')
		}
	}
</script>

<style lang="scss">
</style>