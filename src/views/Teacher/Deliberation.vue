<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <a-tabs>
        	<a-tab-pane v-for="deliberation in deliberations" :key="deliberation.id" :tab="deliberation.title">
				<a-tabs @change="callback">
                    <a-tab-pane v-for="course in courses" :key="course.id" :tab="course.title">
						<!-- Test List card -->
						<a-card :bordered="true" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
							<template #title>
								<h5 class="font-semibold">{{ deliberation.title }} / <small>Cotes {{ course.title }}</small></h5>
								<div style="width:100%; height:1px; background-color:#F1F1F1"></div>
							</template>	
                            <div style="padding:0 30px 30px">
                                <div>
                                    <p>Une fois les cotes envoyé, la moyenne est calculée sur 20 et est soumis au jury</p>
                                </div>
                                <a-collapse v-model="activeKey">
                                    <a-collapse-panel key="1" header="Cotes annuels">
										<a-checkbox @change="change2" v-model="annualCoteChecks[course.id][work.id]" v-for="work in course.annual_works" :key="work.id">
                                            {{ work.title }}
                                        </a-checkbox>
                                    </a-collapse-panel>
                                    <a-collapse-panel key="2" header="Cotes examen" :disabled="false">
                                        <a-checkbox v-model="examCoteChecks[course.id][work.id]" v-for="work in course.annual_works" :key="work.id">
                                            {{ work.title }}
                                        </a-checkbox>
                                    </a-collapse-panel>
                                </a-collapse>
                                <a-button @click="sendCotes" style="margin-top:15px" icon="save">
                                    Déposer les cotes
                                </a-button>
                            </div>
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

    const datas =  [];

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

				testcheck: {
					1: {
						2: true
					}
				},

				annualCoteChecks: {},

				examCoteChecks: {},

				current_course: null,

				moment: momentjs,

                activeKey: ['0'],

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
				formAnnual: this.$form.createForm(this, { name: 'annual' }),

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

			change2() {
				
			},

			sendCotes () {

				this.formAnnual.validateFields((err, values) => {
					if ( !err ) {
						console.log(values)
					}
				});
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
			
			callback(key) {
				//console.log(key);
			},

			create_test(id) {
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
			    deliberations: "deliberations",
			})
		},

		watch: {
			courses (value) {
				console.log(value)
				if (value !== undefined) {
					value.forEach(course => {
						this.annualCoteChecks[course.id] = {}
						this.examCoteChecks[course.id] = {}
						course.annual_works.forEach(work => {
							this.annualCoteChecks[course.id][work.id] = false

							this.examCoteChecks[course.id][work.id] = false
						});
					});
				}
			}
		},

		mounted() {
			this.$store.dispatch('profTests', 1)
			this.$store.dispatch("getDeliberations", 1);
		},
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