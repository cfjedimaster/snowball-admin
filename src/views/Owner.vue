<template>
	<b-row align-h="center">
		<b-col cols="6" >

		<h2>Edit Owner</h2>
		<b-form @submit.prevent="save" v-if="owner">
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="name">Name:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="name" v-model="owner.name" required></b-form-input>
				</b-col>
			</b-row>

			<b-row class="mb-3">
				<b-col cols="3">
					<label for="email">Email:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="email" v-model="owner.email" type="email" required></b-form-input>
				</b-col>
			</b-row>

			<b-row class="mb-3">
				<b-col cols="3">
					<label for="picture">Picture:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="picture" v-model="owner.picture" required></b-form-input>
				</b-col>
			</b-row>

			<b-row class="mb-3">
				<b-col cols="3">
					<label for="description">Description:</label>
				</b-col>
				<b-col cols="9">
					<b-form-textarea id="description" v-model="owner.description" required rows="10"></b-form-textarea>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="3"></b-col>
				<b-col cols="9"><b-button type="submit" variant="primary">Save</b-button></b-col>
			</b-row>

		</b-form>

		</b-col>
	</b-row>
</template>

<script>
import { dataService } from '@/api/data';

export default {
	data() {
		return {
			owner:[]
		}
	},
	async mounted() {
		let id = this.$route.params.id;
		this.owner = await dataService.getOwner(id);
		console.log('got an owner');
	},
	methods: {
	}
}
</script>