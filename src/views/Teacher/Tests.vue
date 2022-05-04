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
					
			</a-form>
        </a-modal>	
		
	</div>

</template>

<script>
	import axios from 'axios';
	let momentjs = require('moment');

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
			title: '',
			dataIndex: 'actions',
			scopedSlots: { customRender: 'actions' },
		},
	];

	// Table rows
	const data = [
		{
			"key": 10421,
			"date": "1 Nov, 10:20 AM",
			"status": "Paid",
			"customer": {
				"name": "Orlando Imieto",
				"avatar": "images/team-2.jpg",
			},
			"product": "Nike Sport V2",
			"revenue": "140.20",
		},
		{
			"key": 10422,
			"date": "1 Nov, 10:53 AM",
			"status": "Paid",
			"customer": {
				"name": "Alice Murinho",
				"avatar": "images/team-1.jpg",
			},
			"product": "Valvet T-shirt",
			"revenue": "42.00",
		},
		{
			"key": 10423,
			"date": "1 Nov, 11:13 AM",
			"status": "Refunded",
			"customer": {
				"name": "Michael Mirra",
			},
			"product": "Leather Wallet",
			"extra": "+1 more",
			"revenue": "25.50",
		},
		{
			"key": 10424,
			"date": "1 Nov, 12:20 PM",
			"status": "Paid",
			"customer": {
				"name": "Andrew Nichel",
				"avatar": "images/team-3.jpg",
			},
			"product": "Bracelet Onu-Lino",
			"revenue": "19.40",
		},
		{
			"key": 10425,
			"date": "1 Nov, 1:40 PM",
			"status": "Canceled",
			"customer": {
				"name": "Sebastian Koga",
				"avatar": "images/team-4.jpg",
			},
			"product": "Phone Case Pink",
			"extra": "x 2",
			"revenue": "44.90",
		},
		{
			"key": 10426,
			"date": "1 Nov, 2:19 AM",
			"status": "Paid",
			"customer": {
				"name": "Laur Gilbert",
			},
			"product": "Backpack Niver",
			"revenue": "112.50",
		},
		{
			"key": 10427,
			"date": "1 Nov, 3:42 AM",
			"status": "Paid",
			"customer": {
				"name": "Iryna Innda",
			},
			"product": "Adidas Vio",
			"revenue": "200.00",
		},
		{
			"key": 10428,
			"date": "2 Nov, 9:32 AM",
			"status": "Paid",
			"customer": {
				"name": "Arrias Liunda",
			},
			"product": "Airpods 2 Gen",
			"revenue": "350.00",
		},
		{
			"key": 10429,
			"date": "2 Nov, 10:14 AM",
			"status": "Paid",
			"customer": {
				"name": "Rugna Ilpio",
				"avatar": "images/team-5.jpg",
			},
			"product": "Bracelet Warret",
			"revenue": "15.00",
		},
		{
			"key": 10430,
			"date": "2 Nov, 12:56 PM",
			"status": "Refunded",
			"customer": {
				"name": "Anna Landa",
				"avatar": "images/ivana-squares.jpg",
			},
			"product": "Watter Bottle India",
			"extra": "x 3",
			"revenue": "25.00",
		},
		{
			"key": 10431,
			"date": "2 Nov, 3:12 PM",
			"status": "Paid",
			"customer": {
				"name": "Karl Innas",
			},
			"product": "Kitchen Gadgets",
			"revenue": "164.90",
		},
		{
			"key": 10432,
			"date": "2 Nov, 5:12 PM",
			"status": "Paid",
			"customer": {
				"name": "Oana Kilas",
			},
			"product": "Office Papers",
			"revenue": "23.90",
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
				
				// Table rows
				data,

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

				courses: [],

			}
		},
		methods: {
			deleteRow(id) {
				console.log(id)
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
					axios({
							method: 'delete',
							url: 'http://localhost:8080/teacher/work',
							data: {
								title: values.title,
								description: values.description,
								date: values.date,
								course_id: this.current_course,
							}
						})
						.then((response) => {
							if (response.data.success) {
								Toast.fire({
								icon: 'success',
								title: response.data.message
							})
							} else {
								Toast.fire({
									icon: 'success',
									title: response.data.message
								})
							}
						}).catch(err => console.log(err))
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

			handleSelectChange() {
				console.log('changed')
			},

			showEditModal() {
				this.visible = true;
			},
			handleOk(e) {
				e.preventDefault();
				
				this.visible = false;

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
					if ( !err ) {
						axios({
							method: 'post',
							url: 'http://localhost:8080/teacher/work',
							data: {
								title: values.title,
								description: values.description,
								date: values.date,
								course_id: this.current_course,
							}
						})
						.then((response) => {
							if (response.data.success) {
								Toast.fire({
								icon: 'success',
								title: response.data.message
							})
							} else {
								Toast.fire({
									icon: 'success',
									title: response.data.message
								})
							}
						}).catch(err => console.log(err))
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
				this.current_course = id
				this.showModal();
			}
						
		},
		mounted() {
			axios
				.get('http://localhost:8080/teacher/works/11')
				.then((response) => {
					this.courses = response.data
				})
				.catch(err => console.log(err))
		},
	}
</script>

<style lang="scss">
</style>