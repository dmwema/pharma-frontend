<template>

	<!-- Invoices Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
		<template #title>
			<h6 class="font-semibold m-0">Membres</h6>
		</template>
		<a-list
			class="invoice-list"
			item-layout="horizontal"
			:split="false"
			:data-source="data"
		>
			<a-list-item slot="renderItem" slot-scope="item">
				<a-list-item-meta
					:title="item.fullname"
					:description="item.code"
				></a-list-item-meta>
				<div class="amount">{{ item.role }}</div>
			</a-list-item>
		</a-list>
	</a-card>
	<!-- / Invoices Card -->

</template>

<script>

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
			}
		},
	})

</script>