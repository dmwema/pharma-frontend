
<template>
	<div class="sign-in">
		<Loader v-if="isLoading"></Loader>
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle" class="row-main">
			<!-- Edit credentials Form Column -->
			<a-col :span="24" :md="{ span: 14, offset: 2 }" :lg="10" :xl="6" class="col-form mr-auto">
				<a-alert
					v-if="has_valid_error"
					:message="valid_message"
					type="error"
					closable
					:after-close="handleClose"
					style="margin-bottom:40px"
				/>
				<h4 class="mb-15">Se connecter</h4>

				<!-- Sign Up Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Email" :colon="false">
						<a-input 
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Veuillez entrer votre adresse mail' }] },
						]" placeholder="Adresse email" type='email'/>
					</a-form-item>

                    <a-form-item class="mb-10" label="Mot de passe" :colon="false">
						<a-input 
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Veuillez entrer un mot de passe' }] },
						]" placeholder="Mot de passe" :type="passType"/>
					</a-form-item>

                    <a-form-item class="mb-10" :colon="false">
						<a-checkbox @change="showPass" v-model="passShown">
							Afficher les mots de passe	
						</a-checkbox>
					</a-form-item>

					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
						SE CONNECTER
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign Up Form -->

			</a-col>
			<!-- / Edit credentials Form Column -->

			<!-- Sign Up Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<div>
					<div class="img" style="margin-bottom:30px">
						<img src="images/info-rocket-ill.svg" alt="rocket">
					</div>
					<h4 class="text-white">Bienvenue !</h4>
					<p class="text-white">Utilisez vos identifiants pour vous connecter et gérer tout ce qui vous concerne en rapport avec la faculté</p>
				</div>
			</a-col>
			<!-- / Sign Up Image Column -->

		</a-row>
	</div>
</template>

<script>
	import Vuex from 'vuex'
	import Loader from '../../../components/Loader.vue'

	export default ({
		components: {
			Loader
		},
		data() {
			return {
				// Sign up form object.
				form: this.$form.createForm(this, { name: 'signup_illustration' }),
				visible: false,
				visible2: false,
				passShown: false,
				passType: 'password',
				valid_message: '',
				has_valid_error: false,
			}
		},
		methods: {
			...Vuex.mapActions({
				login: 'auth/login',
				editCredentials: 'editCredentials',
				showLoader: 'showLoader',
			}),

			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.visible = false;
				this.form.validateFields((err, values) => {
					if ( !err ) {
						this.showLoader()
						this.login(values)
					}
				});
			},
			handleClose() {
				this.visible = false;
			},
			handleClose2() {
				this.visible2 = false;
			},
			showPass() {
				if (!this.passShown) {
					this.passShown = false
					this.passType = 'password'
				} else {
					this.passShown = true
					this.passType = 'text'
				}
			}
		},

		computed: {
			...Vuex.mapGetters({
				isLoading: 'isLoading',
			}),
		},
	})

</script>

<style lang="scss">
</style>