
<template>
	<div class="sign-in">   
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle" class="row-main">
		

			<!-- Sign Up Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
            
				<div>
					<div class="img">
						<img src="images/info-rocket-ill.png" alt="rocket">
					</div>
					<h4 class="text-white">Bienvenue Professeur <br><b>Daniel MWEMA</b></h4>
					<p class="text-white">Utilisez le code réçu <b> du decanat</b> pour vous connecter et gérer tout ce qui vous concerne en rapport avec la faculté</p>
				</div>
			</a-col>
			<!-- / Sign Up Image Column -->

		</a-row>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				// Sign up form object.
				form: this.$form.createForm(this, { name: 'signup_illustration' }),
			}
		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
						console.log('Received values of form: ', values) ;
					}
				});
			},
		},
	})

</script>

<style lang="scss">
</style>