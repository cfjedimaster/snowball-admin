<template>
  <b-row align-h="center">
    <b-col cols="6" >
		<pre>
		{{ JSON.stringify(project,null,'\t') }}
		</pre>
		<h2>Edit Project</h2>
		<b-form @submit.prevent="save" v-if="project">
			<b-row class="mb-3">
				<b-col>
					<label for="name">Name:</label>
				</b-col>
				<b-col>
					<b-form-input id="name" v-model="project.name" required></b-form-input>
				</b-col>
			</b-row>

		<!--
        <b-row class="mb-3">
          <b-col>
            <label for="password">Password:</label>
          </b-col>
          <b-col>
            <b-form-input id="password" v-model="password" type="password" required></b-form-input>
          </b-col>
        </b-row>
		-->
			<b-row>
				<b-col></b-col>
				<b-col><b-button type="submit" variant="primary">Save</b-button></b-col>
			</b-row>

		</b-form>
	</b-col>
  </b-row>
</template>

<script>
import { userService } from '@/api/user';

export default {
	data() {
		return {
			project:null,
			me:null,
			owners:null
		}
	},
	async mounted() {
		let id = this.$route.params.id;
		console.log('load '+id);
		this.me = userService.getMe();

		this.owners = await fetch(`/.netlify/functions/get-owners?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + this.me.token.access_token
			},
		}).then((res) => res.json());

		this.project = await fetch(`/.netlify/functions/get-project?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + this.me.token.access_token
			},
		}).then((res) => res.json());
		console.log(this.project);
	},
	methods:{
		save() {
		}
	}
}
</script>