<template>
	<b-row align-h="center">
		<b-col cols="6" >
			<b-table striped hover bordered :items="owners" :fields="fields" selectable @row-selected="loadOwner">
			</b-table>
			<b-btn variant="primary" href="/owner/new">Add Owner</b-btn>
		</b-col>
	</b-row>
</template>

<script>
import { dataService } from '@/api/data';

export default {
	data() {
		return {
			owners:[],
			me:null,
			fields: ['name','email']
		}
	},
	async mounted() {
		this.owners = await dataService.getOwners();
	},
	methods: {
		loadOwner(p) {
			console.log(p[0].id);
			this.$router.push(`/owner/${p[0].id}`);
		}
	}
}
</script>