<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="Mathématique">
               <a-button type="success" @click="showModal"><a-icon type="plus-circle" theme="outlined" />ENREGISTRER UNE EPREUVE</a-button>
                <br>
                <br>
                <!-- Searchable Datatable card -->
                <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
                    <template #title>
                        <h5 class="font-semibold">Première Intérrogation / <small>20 Juillet 20222</small></h5>
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
            </a-tab-pane>
            <a-tab-pane key="2" tab="Informatique" force-render>
                Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="Bilogie Animale">
                Content of Tab Pane 3
            </a-tab-pane>
        </a-tabs>
        
        <a-modal v-model="visible" title="Enrégistrer une épreuve" @ok="handleOk">
            <a-form :form="form" @submit="handleSubmit">
				<a-form-item class="mb-10" label="Date" :colon="false">
					<a-input type="date" placeholder="Basic usage" />
				</a-form-item>

				<a-form-item class="mb-10" label="Donnez un titre à l'épreuve" :colon="false">
					<a-input placeholder="Intitulé" />
				</a-form-item>

				<a-form-item label="Type d'épreuve">
					<a-select
						v-decorator="[
							'type',
							{ rules: [{ required: true, message: 'Please select your gender!' }] },
						]"
						placeholder="Selectionnez une épreuve parmis celles enrégistrées"
						@change="handleSelectChange"
					>
						<a-select-option value="male">
						Examen
						</a-select-option>
						<a-select-option value="female">
						Autre
						</a-select-option>
					</a-select>
				</a-form-item>
					
			</a-form>
        </a-modal>
		
	</div>

</template>

<script>

	// Second table's list of columns.
	const columns2 = [
		{
			title: '#',
			dataIndex: 'id',
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'ETUDIANT',
			dataIndex: 'name',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'MAX / 20',
			dataIndex: 'ponderation',
			sortDirections: ['descend', 'ascend'],
			sorter: (a, b) => a.ponderation - b.ponderation,
		},
		{
			title: '',
			dataIndex: 'actions',
		},
	];
	
	// Second table's list of rows.
	const data2 = [
		{
			key: 1,
			id: 1,
			name: "Jhon Doe",
			ponderation: 4,
			actions: `<a-button type="primary">`
		},
		{
			key: 2,
			id: 2,
			name: "Jhon Doe",
			ponderation: 6,
		}
	] ;

	export default {
		components: {
		},
		data() {
			return {

				// Second table's list of columns.
				columns2,
	
				// Second table's list of rows.
				data2,

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
			showModal() {
				this.visible = true;
			},
			handleOk(e) {
				this.visible = false;

				const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: false,
					didOpen: (toast) => {
						toast.addEventListener('mouseenter', Swal.stopTimer)
						toast.addEventListener('mouseleave', Swal.resumeTimer)
					}
				})

				Toast.fire({
					icon: 'success',
					title: 'Épreue enrégistrée avec succès'
				})
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
			
			handleSelectChange(value) {
				console.log(value);
				this.form.setFieldsValue({
					note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
				});
			},
						
		},
	}
</script>

<style lang="scss">
</style>