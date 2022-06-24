<template>

	<div>
        <a-tabs @change="changeTab" >
        	<a-tab-pane v-for="deliberation in deliberations" :key="deliberation.id" :tab="deliberation.title">
				<a-tabs>
                    <a-tab-pane v-for="course in courses" :key="course.id" :tab="course.title">
						<!-- Test List card -->
						<a-card :bordered="true" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
							<template #title>
								<h5 class="font-semibold">{{ deliberation.title }} / <small>Cotes {{ course.title }}</small></h5>
								<div style="width:100%; height:1px; background-color:#F1F1F1"></div>
							</template>	
                            <div style="padding:0 30px 30px">
                                <div>
                                    <p class="m-0">Une fois les cotes envoyé, la moyenne est calculée sur 20 et est soumis au jury</p>
                                </div>
                                <a-button @click="sendCotes" style="margin-top:10px" icon="save">
                                    Déposer les cotes
                                </a-button>
                                <a-button @click="seeCotes(course.id)" style="margin-top:10px; margin-left: 10px" icon="eye">
                                    Voir les cotes
                                </a-button>
                            </div>
				        </a-card>
				    <!-- / Test List card -->
                    </a-tab-pane>
                </a-tabs>
            </a-tab-pane>
        </a-tabs>
        
        <a-modal centered width="100%" v-model="visible" title="Toutes les cotes" @ok="handleOk">
			<table class="cote_table">
				<!-- Responsive Table Header Section -->
				<thead>
					<tr>
						<th v-for="coteColumn in coteColumns" :key="coteColumn">{{ coteColumn }}</th>
					</tr>
				</thead>
				<!-- Responsive Table Body Section -->
				<tbody class="responsive-table__body">
					<tr v-for="data in coteData" :key="data.key">
						<td v-for="row in data" :key="row" class="responsive-table__body__text responsive-table__body__text--types">{{ row == null ? 'Vide': row }}</td>
					</tr>
				</tbody>
			</table>
        </a-modal>	
		
	</div>

</template>

<script>
	import Toast from "../../store/alert"

	let momentjs = require('moment');
	import Vuex from 'vuex'

    const data =  [];

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

				selected_deliberation_id: null,

				annualCoteChecks: {
					0: true
				},

				coteColumns: [],

				coteData: [],

				data: data,

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
				getAllCourseCotes: 'getAllCourseCotes',
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

			sendCotes () {
				console.log({'annual': this.annualCoteChecks, 'exam': this.examCoteChecks})
			},

			seeCotes (course_id) {
				this.showModal()
				this.getAllCourseCotes({course_id: course_id, session_id: this.selected_deliberation_id})
				.then(response => {
					console.log(response)
					this.coteColumns = response.data.columns
					this.coteData = response.data.datas
				}).catch(err => {
					console.log(err)
				})
			},

			changeTab(value) {
				this.selected_deliberation_id = value
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
			change() {
				console.log(this.annualCoteChecks)
				this.annualCoteChecks[25] = false
				this.annualCoteChecks [26] = true
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
			    allcotes: "deliberations",
			})
		},

		watch: {
			deliberations(values) {
				if (values !== undefined && this.selected_deliberation_id === null) {
					this.selected_deliberation_id = values[0].id
				}
			}
		},

		mounted() {
			this.$store.dispatch("getDeliberations", 1);
			this.$store.dispatch('profTests')
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
}

/** table */

table.cote_table { 
  width: 100%; 
  border-collapse: collapse; 
}

.cote_table tr:nth-of-type(odd) { 
  background: #eee; 
}
.cote_table th { 
  background: #fff; 
  color: #000; 
  font-weight: bold; 
}
.cote_table td, .cote_table th { 
  padding: 6px; 
  text-align: left; 
}

@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	/* Force table to not be like tables anymore */
	table.cote_table , .cote_table thead, .cote_table tbody, .cote_table th, .cote_table td, .cote_table tr { 
		display: block; 
	}
	
	/* Hide table headers (but not display: none;, for accessibility) */
	.cote_table thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	.cote_table tr { border: 1px solid #ccc; }
	
	.cote_table td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 
	}
	
	.cote_table td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
	
	/*
	Label the data
	*/
	.cote_table td:nth-of-type(1):before { content: "First Name"; }
	.cote_table td:nth-of-type(2):before { content: "Last Name"; }
	.cote_table td:nth-of-type(3):before { content: "Job Title"; }
	.cote_table td:nth-of-type(4):before { content: "Favorite Color"; }
	.cote_table td:nth-of-type(5):before { content: "Wars of Trek?"; }
	.cote_table td:nth-of-type(6):before { content: "Secret Alias"; }
	.cote_table td:nth-of-type(7):before { content: "Date of Birth"; }
	.cote_table td:nth-of-type(8):before { content: "Dream Vacation City"; }
	.cote_table td:nth-of-type(9):before { content: "GPA"; }
	.cote_table td:nth-of-type(10):before { content: "Arbitrary Data"; }
}
</style>