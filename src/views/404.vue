<!-- 
	This is the 404 error page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<a-result status="404" title="404" sub-title="Desolé, la page que vous voullez charger n'existe pas ou a été supprimée">
		<template #extra>
			<router-link class="ant-btn ant-btn-primary" to="/">Retour en arrière</router-link>
		</template>
	</a-result>
</template>