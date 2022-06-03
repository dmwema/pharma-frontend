<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <a-tabs>
            <a-tab-pane v-for="course in courses" :key="course.id" :tab="course.title">
				<a-tabs @change="callback">
            		<a-tab-pane v-for="work in course.annual_works" :key="work.id" :tab="work.title">
						<!-- Test List card -->
						<a-card :bordered="true" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
							<template #title>
								<h5 class="font-semibold">{{ work.title }} / <small>{{ work.date_work }}</small></h5>
								<div style="width:100%; height:1px; background-color:#F1F1F1"></div>
								<h5 class="font-semibold" style="color:#1890FF"><small>Sur </small>{{ work.max }}</h5>
							</template>					<!-- Table search -->
							<div class="mx-25">
								<a-row type="flex" :gutter="24">
									<a-col :span="24" class="text-right">
										<a-input-search placeholder="Rechercher" style="max-width: 200px;" v-model="query" @change="onSearchChange" />
									</a-col>
								</a-row>
							<a-button v-if="hasChange" @click="updateCotes" icon="save" type="primary" class="btn-status border-primary mr-5">
								Mettre à jour
							</a-button>	
							</div>
					<!-- / Table search -->
					
					<!-- Test table -->
					<a-table class="mt-20"
						:columns="columns"
						:data-source="work.students"
						:pagination="{pageSize: pageSize,}"
					>

						<template slot="date_work" slot-scope="date_work">{{ moment(date_work).format("D MMM YYYY") }}</template>

						<template slot="cote" slot-scope="cote">
							<a-input class="cote_input" :class="updatedInputs[cote] ? 'border-red': ''"
							type="number" @change="updatedInput(cote)" min="0" :max="work.max" v-model="inputCotes[cote]"/>
						</template>


					</a-table>
					<!-- / Orders table -->

				</a-card>
				<!-- / Test List card -->
            </a-tab-pane>
        </a-tabs>
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
					
			</a-form>
        </a-modal>	
		
	</div>

</template>

<script>
	import Toast from "../../store/alert"

	let momentjs = require('moment');
	import Vuex from 'vuex'

	// Table columns
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'id' },
		},
		{
			title: 'ETUDIANT',
			dataIndex: 'names',
			sorter: (a, b) => a.names - b.names,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'student' },
		},
		{
			title: 'COTE',
			dataIndex: 'cote',
			sorter: (a, b) => a.cote.length - b.cote.length,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'cote' },
		},
	];
	export default {
		components: {
		},
		data() {
			return {

				current_course: null,

				moment: momentjs,

				updatedInputs: {},

				inputCotes: {},

				inputCotes: {
					1: 1,
					2: 2,
					3: 3,
					4: 4,
					5: 5,
					6: 6,
				},

				hasChange: false,
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
				updateStoreCotes: 'updateCotes',
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

			updateCotes() {
				let to_update = {}
				
				this.cotes.forEach(cote => {
					if (this.inputCotes[cote.id] !== cote.cote){
						to_update['data_' + cote.id] = this.inputCotes[cote.id]
					}
				});

				this.updateStoreCotes(to_update).then((response) => {
					if (response.data.success) {
						this.hasChange = false

						Toast.fire({
							icon: "success",
							title: response.data.message,
						});
					}
				})
			},

			updatedInput(cote) {
				this.hasChange = true
				this.updatedInputs[cote] = true
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
				//console.log(key);
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
				cotes: 'cotes',
				getSingleCote: 'getSingleCote',
				coteObj: 'coteObj',
			})
		},

		mounted() {
			this.$store.dispatch('profTests', 1)
			this.$store.dispatch('getCotes')
		},

		watch: {
			coteObj(value) {
				this.inputCotes = value
			},

			hasChange(value) {
				if (!value) {
					this.updatedInputs = {}
				}
			}, 
			inputCotes(value) {
				console.log(value)
			}
		}
	}
</script>

<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
    text-align: right;
	margin-right: 10px;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
    text-align: right;
	margin-right: 10px;
}

.cote_input {
	width: 70px
}

.cote_input.border-red {
	width: 70px;
	border: 1px solid #000;
}
</style>