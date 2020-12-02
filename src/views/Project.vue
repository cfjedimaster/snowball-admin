<template>
  <b-row align-h="center">
    <b-col cols="6" >
		<pre style="height: 250px">
		{{ JSON.stringify(project,null,'\t') }}
		todo edit wise: sales ladder, rewards text (maybe) , 

		</pre>

		<h2>Edit Project</h2>
		<b-form @submit.prevent="save" v-if="project">
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="name">Name:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="name" v-model="project.name" required></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="public">Public:</label>
				</b-col>
				<b-col cols="9">
					<b-form-checkbox id="public" v-model="project.public"></b-form-checkbox>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="owner">Owner:</label>
				</b-col>
				<b-col cols="9">
					<b-form-select id="owner" v-model="project.owner.id" :options="owners" value-field="id" text-field="name"></b-form-select>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="urlslug">URL Slug:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="urlslug" v-model="project.urlslug" required></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="header">Header:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="header" v-model="project.header" required></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="subheader">Subheader:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="subheader" v-model="project.subheader" required></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="video">Video:</label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="video" v-model="project.video" required></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="callout">Callout:</label>
				</b-col>
				<b-col cols="9">
					<b-form-textarea id="callout" v-model="project.callout" required rows="5"></b-form-textarea>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="description">Description:</label>
				</b-col>
				<b-col cols="9">
					<b-form-textarea id="description" v-model="project.description" required rows="5"></b-form-textarea>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="price">Price: </label>
				</b-col>
				<b-col cols="9">
					<b-form-input id="price" v-model="project.price" required type="number"></b-form-input>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="shipDate">Ship Date:</label>
				</b-col>
				<b-col cols="9">
					<b-form-datepicker id="shipDate" v-model="project.shipDate" required></b-form-datepicker>
				</b-col>
			</b-row>
			<b-row class="mb-3">
				<b-col cols="3">
					<label for="closeDate">Close Date:</label>
				</b-col>
				<b-col cols="9">
					<b-form-datepicker id="closeDate" v-model="project.closeDate" required></b-form-datepicker>
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
import { dataService } from '@/api/data';

export default {
	data() {
		return {
			project:null,
			me:null,
			owners:null, 
			selectedOwner:null
		}
	},
	async mounted() {
		let id = this.$route.params.id;
		this.project = await dataService.getProject(id);
		/*
		project.owner = an object, but we need a way to link the drop down to the "fuller" owner object
		which is a full Fauna thing whereas the embedded one is simpler

		Ok, so as of right now, when you pick a new owner, it correclty changes project.owner.id, but the rest of the ob stays the same,
		BUT, when we store the project, we don't care about that data, just the ID of the connection. So... I'm ok with this I think?
		*/
		this.owners = await dataService.getOwners();

	},
	methods:{
		save() {
		}
	}
}
</script>