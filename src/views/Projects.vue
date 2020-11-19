<template>
	<div>	

		<b-table striped hover bordered :items="projects" :fields="fields" selectable @row-selected="loadProject">
		</b-table>
	</div>
</template>

<script>
import { userService } from '@/api/user';

export default {
	data() {
		return {
			projects:[],
			me:null,
			fields: ['name','updated','urlslug','public']
		}
	},
	async mounted() {
		console.log('get projects');
		this.me = userService.getMe();
		this.projects = await fetch('/.netlify/functions/get-projects', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + this.me.token.access_token
			},
		}).then((res) => res.json());

		this.projects.forEach(p => {
			p.updated = dateFormat(p.updated);
		});

	},
	methods: {
		loadProject(p) {
			console.log(p[0].id);
			this.$router.push(`/project/${p[0].id}`);
		}
	}
}

function dateFormat(d) {
	return new Intl.DateTimeFormat('en-US').format(new Date(d));
}
</script>