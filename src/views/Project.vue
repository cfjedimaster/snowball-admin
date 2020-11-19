<template>
	<div>
	a project, {{ project }}
	</div>
</template>

<script>
import { userService } from '@/api/user';

export default {
	data() {
		return {
			project:null,
			me:null
		}
	},
	async mounted() {
		let id = this.$route.params.id;
		console.log('load '+id);
		this.me = userService.getMe();
		this.project = await fetch(`/.netlify/functions/get-project?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + this.me.token.access_token
			},
		}).then((res) => res.json());
		console.log(this.project);

	}
}
</script>