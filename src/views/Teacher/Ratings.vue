<!-- 
	This is the DataTables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="Mathématique">
                <!-- Searchable Datatable card -->
                <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">
                    <template #title>
                        <h5 class="font-semibold">Première Intérrogation / <small>20 Juillet 20222</small></h5>
						
						<!-- Test List header -->
						<a-row type="flex" :gutter="24">
							<a-col :span="12">
		               			<a-button type="success" @click="showModal"><a-icon type="file-excel" theme="outlined" />IMPORTER VIA EXCEL</a-button>
							</a-col>
							<a-col :span="12" class="mb-24 text-right">
							<a-button @click="csvExport(csvData)" class="ml-15">
								<i class="ni ni-archive-2 mr-5"></i> EXPORTER EN .XLS
							</a-button>
						</a-col>
						</a-row>
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
                                <a-input-search placeholder="input search text" style="max-width: 200px;" v-model="query" @change="onSearchChange"/>
                            </a-col>
                        </a-row>
                    </div>
                    
                    <a-table class="mt-20" :columns="columns2" :data-source="data2" :pagination="{pageSize: pageSize2,}">
						<template slot="cote" slot-scope="cote">
							<a-input placeholder="0" min="0" max="20" type="number" :value="cote" style="width:42px"/>	
						</template>	
					</a-table>
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
        
        <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
            <a-form :form="form" @submit="handleSubmit">
				<a-form-item label="Epreuve">
					<a-select
						v-decorator="[
						'course',
						{ rules: [{ required: true, message: 'Veuillez choisir une épreuve!' }] },
						]"
						placeholder="Selectionnez une épreuve ici"
						@change="handleSelectChange"
					>
						<a-select-option value="mathematiques">
						Mathématiques
						</a-select-option>
						<a-select-option value="info">
						Informatique
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-upload-dragger
					name="file"
					:multiple="false"
					action="google.com"
					@change="handleChange"
				>
					<p class="ant-upload-drag-icon">
					<a-icon type="inbox" />
					</p>
					<p class="ant-upload-text">
					Cliquez ou glissez et deposez un fichier ici
					</p>
					<p class="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibit from uploading company data or other
					band files
					</p>
				</a-upload-dragger>
	
				<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
				
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
			scopedSlots: { customRender: 'cote' },
		}
	];
	
	// Second table's list of rows.
	const data2 = [
		{
			key: 1,
			id: 1,
			name: "Jhon Doe",
			ponderation: 4,
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
				console.log(e);
				this.visible = false;
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
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
	}

	/* Firefox */
	input[type=number] {
	-moz-appearance: textfield;
	}
</style>