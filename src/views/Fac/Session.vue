<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <!-- Test List header -->
				<a-row type="flex" :gutter="24">
					<a-col :span="12" class="mb-24">
               			<a-button @click="showModal"><a-icon type="plus-circle" theme="outlined" />ENREGISTRER UNE SESSION</a-button>
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
							<a-button @click="showHorraire(id)" icon="table" type="success" class="btn-status border-primary mr-5">
								Horraire
							</a-button>		
						</template>	

					</a-table>
					<!-- / Orders table -->

				</a-card>
				<!-- / Test List card -->
        

        <a-modal v-model="visible" title="Enrégistrer une session" centered @ok="handleOk">
            <a-form :form="form" class="row">
				<a-form-item class="mb-10 col-md-6" label="Intitulé" :colon="false">
					<a-input 
						v-decorator="[
							'title',
							{ rules: [{ required: true, message: 'Ce champ est réquis' }] },
						]" type="text" placeholder="Intitulé de la session" />
				</a-form-item>

				<a-form-item class="mb-10" label="Dates" :colon="false">
					<a-space direction="vertical" :size="14">
                        <a-range-picker 
                            :format="dateFormat"
                            v-model:value="value1"   
							:placeholder="['Date du début', 'Date de la fin']"
                        />
                    </a-space>
				</a-form-item>

			</a-form>
        </a-modal>

        <a-modal centered width="90%" v-model="visible2" :title="'Horraire des examens ' + selectedSession.title + ' G1 Pharmacie'" @ok="handleOk2">
			<a-row type="flex" :gutter="24">
				<a-col :span="16">
					<!-- Test table -->
					<a-table class="mt-20"
						:columns="columns2"
						:data-source="selectedSession.schedules"
						:pagination="{pageSize: pageSize,}"
					>

						<template slot="id" slot-scope="id">#{{ id }}</template>


						<template slot="actions"  slot-scope="id">
							<a-button @click="deleteRow2(id)" icon="minus" type="danger" class="btn-status border-danger">
							Rétirer</a-button>
						</template>	

					</a-table>
					<!-- / Orders table -->
				</a-col>
				<a-col :span="8">
				<a-card :bordered="true" class="header-solid mb-24" :bodyStyle="{paddingTop: '16px'}">
					<h6>Ajouter un cours à l'horraire</h6>
					<a-form
						:form="form_new"
						class="row"
						autocomplete="off"
						@submit="handleCreateSubmit"	
					>
						<a-form-item class="mb-10 col-md-6" label="Cours" :colon="false">
							<a-select 
								v-decorator="[
									'course',
									{ rules: [{ required: true, message: 'Veuillez selectionner un cours!' }] },
								]"
								placeholder="Selectionnez un cours parmis ceux enrégistrés"
							>
								<a-select-option :value="course.id" v-for="course in courses" :key="course.id">
								{{ course.title + ' (' + course.professor + ')' }}
								</a-select-option>
							</a-select>
						</a-form-item>

						<a-form-item class="mb-10" label="Date et heure" :colon="false">
							<a-date-picker v-decorator="[
									'date',
									{ rules: [{ required: true, message: 'Veuillez selectionner une date!' }] },
								]" show-time format="DD-MM-YYYY à HH:mm" placeholder="Date et Heure" @ok="onOk" />
						</a-form-item>
						<a-form-item>
							<a-button type="primary" html-type="submit">Ajouter</a-button>
						</a-form-item>
					</a-form>	
				</a-card>			
				</a-col>
			</a-row>
        </a-modal>	

	</div>

</template>

<script>

	import Vuex from 'vuex'
    import { defineComponent, ref } from 'vue';

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
			title: 'Intitulé',
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Date début',
			dataIndex: 'start',
			sorter: (a, b) => stringSorter(a, b, 'email'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Date fin',
			dataIndex: 'end',
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

	const columns2 = [
		{
			title: 'ID',
			dataIndex: 'key',
			sorter: (a, b) => a.key - b.key,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'key' },
		},
		{
			title: 'Cours',
			dataIndex: 'course',
			sorter: (a, b) => a.course.length - b.course.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Date',
			dataIndex: 'date',
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
		data() {
			return {
				
				// Table columns
				columns,
				// Table columns
				columns2,

                dateFormat: "YYYY-MM-DD",
				
                // First table's number of rows per page.
				pageSize: 10,

				// Second table's number of rows per page.
				pageSize2: 10,
                value1: null,
				
				// Second table's search query.
				query: '',

				//modal visibility
      			visible: false,

				//modal visibility
      			visible2: false,
				
				formLayout: 'horizontal',
      			
				form: this.$form.createForm(this, { name: 'coordinated' }),
      			
				form_new: this.$form.createForm(this, { name: 'newForm' }),
      			
				form_edit: this.$form.createForm(this, { name: 'editform' }),

				// Table's selected rows
      			selectedRowKeys: [],

				date: null,

			}
		},
		methods: {
			...Vuex.mapActions({
				deleteSession: 'deleteSession',
				deleteSchedule: 'deleteSchedule',
				addSession: 'addSession',
				editSelectedSession: 'editSelectedSession',
				addSchedule: 'addSchedule',
			}),

			onOk (value) {		
			},
			deleteRow(id) {
				//this.editSelectedSession(id)
				this.$swal.fire({
					title: "Êtes-vous sûr de vouloir supprimer cette session ?",
					text: "Une fois supprimées, vous n'allez plus récuperer ces informations. Et si la session contient des délibérations, elles seront toutes supprimées.",
					icon: "warning",
					showDenyButton: true,
					denyButtonText: `Supprimer`,
					confirmButtonText: 'Annuler',
					focusConfirm: false,
					dangerMode: true,
				}).then((result) => {
				if (result.isConfirmed) {
					} else if (result.isDenied) {
						this.deleteSession({session_id: id, promotion_id: this.$route.params.promo_id})
					}
				})
			},

			deleteRow2(id) {
				this.deleteSchedule({id: id, session_id: this.selectedSession.id})
			},

			showHorraire(id) {
				this.editSelectedSession(id)
				console.log(this.selectedSession)
				this.visible2 = true
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
                        let date_start = this.value1[0]._d
                        let date_end = this.value1[1]._d

						let start_date_str = (date_start.getFullYear()) + '-' + (date_start.getMonth() + 1) + '-' + (date_start.getDate())
						let end_date_str = (date_end.getFullYear()) + '-' + (date_end.getMonth() + 1) + '-' + (date_end.getDate())
						let data = {
							title: values.title,
							start: start_date_str,
							end: end_date_str,
							promotion_id: this.$route.params.promo_id
						}
						this.addSession(data)
					}
				});
			},
			
			handleOk2(e) {
				e.preventDefault();
				console.log('ok')
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

			handleCreateSubmit(e) {
				e.preventDefault();
				this.form_new.validateFields((err, values) => {
					if (!err) {
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

						let moment_date = values.date._d
						let save_date = moment_date.getFullYear() + '-' + (moment_date.getMonth() + 1) + '-' + moment_date.getDate() + ' ' + moment_date.getHours() + ':' + moment_date.getMinutes()
						
						let datas = {
							course_id: values.course,
							date: save_date,
							session_id: this.selectedSession.id,
							promotion_id: this.$route.params.promo_id
						}
						
						this.addSchedule(datas)
					}
				});
			},
			
			handleSelectChange(value) {
			},
						
		},

		computed: {
			...Vuex.mapGetters({
				data: 'sessions',
				selectedSession: 'getSelectedSession',
				courses: 'courses',
			}),
		},

		created() {
    		this.$store.dispatch('getSessions', this.$route.params.promo_id)
    		this.$store.dispatch('getCourses', this.$route.params.promo_id)
		}
	}
</script>

<style lang="scss">
</style>