
<template>
	<div class="sign-in">
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle" class="row-main">

			<!-- Sign Up Form Column -->
			<a-col :span="24" :md="{ span: 14, offset: 2 }" :lg="10" :xl="6" class="col-form mr-auto" v-if="isloginpage">
				<a-alert
					v-if="visible"
					message="Le code secret entré est invalide"
					type="error"
					closable
					:after-close="handleClose"
					style="margin-bottom:40px"
				/>
				<h4 class="mb-15">Se connecter</h4>
				<p class="text-muted">Entrez le code de connexion pour se connecter</p>

				<!-- Sign Up Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Entrez le code secret" :colon="false">
						<a-input 
						v-decorator="[
						'code',
						{ rules: [{ required: true, message: 'Veuillez entrer le code secret' }] },
						]" placeholder="Code secret" />
					</a-form-item>
					
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
						SUIVANT
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign Up Form -->

			<p class="font-semibold text-muted text-center">Vous n'avez pas réçu de code secret ou vous l'avez perdu ? <router-link to="/sign-in" class="font-bold text-dark">(Re)demandez-les</router-link></p>
			</a-col>
			<!-- / Sign Up Form Column -->

			<!-- Edit credentials Form Column -->
			<a-col :span="24" :md="{ span: 14, offset: 2 }" :lg="10" :xl="6" class="col-form mr-auto" v-if="!isloginpage">
				<a-alert
					v-if="has_valid_error"
					:message="valid_message"
					type="error"
					closable
					:after-close="handleClose"
					style="margin-bottom:40px"
				/>
				<a-alert
					v-if="visible2"
					message="Un mail a été envoyé à l'adresse renseigné. Veuillez consulter votre boite"
					type="success"
					closable
					:after-close="handleClose2"
					style="margin-bottom:40px"
				/>
				<h4 class="mb-15">Modifiez vos information de connexion</h4>
				<p class="text-muted">Pour des raisons de sécurité, nous vous recommendons d'enrégistrer une adresse mail et un mot de passe avec les quelles vous vous connecterez.</p>

				<!-- Sign Up Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="cred_form"
					class="login-form"
					@submit="handlecredSubmit"
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

                    <a-form-item class="mb-10" label="Confirmez le mot de passe" :colon="false">
						<a-input 
						v-decorator="[
						'password_c',
						{ rules: [{ required: true, message: 'Veuillez entrer de nouveau le mot de passe' }] },
						]" placeholder="Confirmer le mot de passe" :type="passType"/>
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
					<div class="img">
						<img src="images/info-rocket-ill.png" alt="rocket">
					</div>
					<h4 class="text-white">Bienvenue Professeur <br><b>{{ prof_names }}</b></h4>
					<p class="text-white">Utilisez le code réçu <b> du decanat</b> pour vous connecter et gérer tout ce qui vous concerne en rapport avec la faculté</p>
				</div>
			</a-col>
			<!-- / Sign Up Image Column -->

		</a-row>
	</div>
</template>

<script>
	import axios from 'axios';

	export default ({
		data() {
			return {
				// Sign up form object.
				form: this.$form.createForm(this, { name: 'signup_illustration' }),
				cred_form: this.$form.createForm(this, { name: 'cred_illustration' }),
				prof_names: '',
				visible: false,
				visible2: false,
				isloginpage: true, 
				passShown: false,
				passType: 'password',
				valid_message: '',
				has_valid_error: false,
			}
		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.visible = false;
				this.form.validateFields((err, values) => {
					if ( !err ) {
						axios({
							method: 'post',
							url: 'http://localhost:8080/check',
							data: {
								link: this.$route.params.link,
								secret: values.code
							}
						})
						.then((response) => {
							if (response.data.success == false) {
								this.visible = true
							} else {
								this.isloginpage = false
							}
						}).catch(err => console.log(err))
					}
				});
			},
			handlecredSubmit(e) {
				e.preventDefault();
				this.cred_form.validateFields((err, values) => {
					if (values.password !== values.password_c) {
						this.has_valid_error = true
						this.valid_message = "Les deux mots de passes ne correspondent pas"
						return null;
					} else {
						this.has_valid_error = false
					}
					if ( !err ) {
						axios({
							method: 'post',
							url: 'http://localhost:8080/edit-credentials',
							data: {
								email: values.email,
								password: values.password,
								link: this.$route.params.link
							}
						})
						.then((response) => {
							if (response.data.saved) {
								this.visible2 = true
							}
							console.log(response.data)
						}).catch(err => console.log(err))
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
		beforeMount() {
			axios({
				method: 'post',
				url: 'https://pharma-delib-api.herokuapp.com/checklink',
				data: {
					link: this.$route.params.link
				}
			})
			.then((response) => {
				if (response.data.success) {
					this.prof_names = response.data.professor.firstname + ' ' + response.data.professor.lastname
					//this.$root.hideLoader()
				} else { 
					this.$router.push(this.$route.params.link + '/not-found')
					console.log(this.$root)
					//this.$root.hideLoader()
				}
			}).catch(err => console.log(err))
		},
	})

</script>

<style lang="scss">
</style>