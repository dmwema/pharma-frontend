<template>
	<div>
		<!-- Billing Information Card -->
		<a-card :bordered="false" class="header-solid" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
			<template #title>
				<h6 class="font-semibold m-0">Délibérations</h6>
			</template>
			<a-row :gutter="[24, 24]">
				<a-button icon="file" type="primary" @click="new_delib" class="btn-status ml-4 border-primary mr-5">
					Convoquer une délibération
				</a-button>	
				<a-col :span="24" v-for="deliberation in deliberations" :key="deliberation.id">
					<hr style="border:1px solid #fbfbfb">
					<a-card :bordered="false" class="card-billing-info" :class="deliberation.published ? 'published': ''">
					<div class="col-info">
						<a-descriptions :title="deliberation.title" :column="1">

							<a-descriptions-item label="Date">
								{{ deliberation.date }}
							</a-descriptions-item>
							<a-descriptions-item label="Message envoyé">
								{{ deliberation.message }}
							</a-descriptions-item>
							<a-descriptions-item>
								<a-button type="link" size="small" @click="publish(deliberation.id, deliberation.published)" style="padding:0">
									<a-icon type="share-alt" theme="outlined" />
									<span class="text-primary">{{ deliberation.published ? "Déjà publié": "PUBLIER RÉSULTATS" }}</span>
								</a-button>
							</a-descriptions-item>
						</a-descriptions>
					</div>
					<div class="col-action"	 v-if="!deliberation.published">
						<a-button type="link" size="small" @click="deleteD(deliberation.id, deliberation.published)">
							<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="fill-danger" fill-rule="evenodd" clip-rule="evenodd" d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z" fill="#111827"/>
							</svg>
							<span class="text-danger">SUPPRIMER</span>
						</a-button>
					</div>
					<div class="col-action">
						<a-button type="link" size="small">
							<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="fill-primary" fill-rule="evenodd" clip-rule="evenodd" d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z" fill="#111827"/>
							</svg>
							<router-link :to="{ name: 'JuryTeacherResult', params: { promotion_id: promotion_id, 'professor_id': professor_id, 'deliberation_id': deliberation.id }}">
								<span class="text-primary">RESULTATS</span>
							</router-link>
						</a-button>
					</div>
				</a-card>
				</a-col>
			</a-row>
		</a-card>
		<!-- / Billing Information Card -->
	
        <a-modal v-model="visible2" title="Configurer une délibération" @ok="handleOk2">
            <a-form :form="form_new">

				<a-form-item class="mb-10" label="Date" :colon="false">
					<a-input v-decorator="[
							'date',
							{ rules: [{ required: true, message: 'Vous devez entrer une date' }] },
					]"
					type="date" placeholder="Date de la délibération" />
				</a-form-item>

				<a-form-item class="mb-10" label="Session" :colon="false">
					<a-select 
						v-decorator="[
							'session_id',
							{ rules: [{ required: true, message: 'Veuillez selectionner une session!' }] },
						]"
						placeholder="Selectionnez une session parmis celles enrégistrées"
					>
						<a-select-option :value="session.id" v-for="session in sessions" :key="session.id">
						{{ session.title }}
						</a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item class="mb-10" label="Message à afficher sur le communiqué" :colon="false">
					<a-textarea v-decorator="[
						'message',
						{ rules: [{ required: true, message: 'Vous devez entrer un message' }] },
					]" 
					placeholder="Message" :rows="4"/>
				</a-form-item>
			</a-form>
        </a-modal>
	
        <a-modal v-model="visible" title="Modifier les informations de la délibération" @ok="handleOk">
            <a-form :form="form">

				<a-form-item class="mb-10" label="Date" :colon="false">
					<a-input v-decorator="[
							'date',
							{ rules: [{ required: true, message: 'Vous devez entrer une date' }] },
					]"
					type="date" placeholder="Date de la délibération" />
				</a-form-item>

				<a-form-item class="mb-10" label="Donnez un intutilé à la délibération" :colon="false">
					<a-input v-decorator="[
							'title',
							{ rules: [{ required: true, message: 'Vous devez entrer un intitulé' }] },
					]" 
					placeholder="Intitulé" />

				</a-form-item>

				<a-form-item class="mb-10" label="Message à afficher sur le communiqué" :colon="false">
					<a-textarea v-decorator="[
						'message',
						{ rules: [{ required: true, message: 'Vous devez entrer un message' }] },
					]" 
					placeholder="Message" :rows="4"/>
				</a-form-item>
			</a-form>
        </a-modal>
	</div>

</template>

<script>

	import Vuex from "vuex" 

	export default ({
		data() {
			return {
				visible: false,
				visible2: false,
				promotion_id: this.$route.params.promotion_id,
				professor_id: this.$route.params.professor_id,
      			
				form: this.$form.createForm(this, { name: 'edit_delib' }),
				form_new: this.$form.createForm(this, { name: 'new_delib' }),
			}
		},

		methods: {

			...Vuex.mapActions({
				publishDeliberation: 'publishDeliberation',
				deleteDeliberation: 'deleteDeliberation',
				editselectedDeliberation: 'editselectedDeliberation',
				newDeliberation: 'newDeliberation'
			}),

			new_delib () {
				this.visible2 = true
			},

			publish (id, published) {
				if (published) {
					this.$swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Cette délibération a déjà été publiée et ne peut être modifiée',
					})
				} else {					
					this.$swal.fire({
						title: "Êtes-vous sûre ?",
						text: "Une fois publié, vous n'allez plus revenir en arrière.",
						icon: "warning",
						showDenyButton: true,
						denyButtonText: `Publier`,
						confirmButtonText: 'Annuler',
						focusConfirm: false,
						dangerMode: true,
					}).then((result) => {
					if (result.isDenied) {
						this.publishDeliberation(id)
					}
					})
				}
			},

			deleteD (id, published) {
				if (!published) {					
					this.$swal.fire({
						title: "Êtes-vous sûre ?",
						text: "Une fois supprimée, vous ne pourrez plus recupérer ces données. et ce processus de délibération sera annulé",
						icon: "warning",
						showDenyButton: true,
						denyButtonText: `Supprimer`,
						confirmButtonText: 'Annuler',
						focusConfirm: false,
						dangerMode: true,
					}).then((result) => {
					if (result.isDenied) {
						this.deleteDeliberation(id)
					}
					})
				}
			},

			resultD() {
				console.log(this.$route.params)
			},

			editD (id, published) {
				if (!published) {	
					this.editselectedDeliberation(id)
					this.visible = true
				}
			},

			handleOk(e) {
				e.preventDefault()
				this.visible = false


				this.form.validateFields((err, values) => {
					if ( !err ) {
						console.log(values)
					}
				});
			},

			handleOk2(e) {
				this.form_new.validateFields((err, values) => {
					if ( !err ) {
						this.newDeliberation({ date: values.date, title: values.title, message: values.message, promotion_id: this.$route.params.promotion_id, session_id: values.session_id })
						this.visible2 = false
					}
				});
			},

		},
		computed: {
			...Vuex.mapGetters({
			deliberations: "deliberations",
			sessions: "sessions",
			}),
		},

		mounted() {
			this.$store.dispatch("getDeliberations", 1);
    		this.$store.dispatch('getSessions', this.$route.params.promo_id)
		},
	})

</script>

<style scoped>
	.published {
		border: 1px solid #242424;
	}
</style>