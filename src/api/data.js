import { userService } from '@/api/user';


export const dataService = {

	async getOwner(id) {

		console.log('data service getOwner ' +id);
		let me = await userService.getMe();

		return await fetch(`/.netlify/functions/get-owner?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.json());

	},
	async getOwners() {
		console.log('data service getOwners');
		let me = await userService.getMe();

		return await fetch('/.netlify/functions/get-owners', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.json());

	}, 
	async getProject(id) {

		let me = await userService.getMe();

		return await fetch(`/.netlify/functions/get-project?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.json());
	},
	async getProjects() {

		let me = await userService.getMe();
		return await fetch('/.netlify/functions/get-projects', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.json());

	},
	newOwner() {
		return {
			name:'',
			email:'',
			description:'',
			picture:''
		}
	},
	newProject() {
		return {
			name:'p1',
			public:false,
			owner:this.newOwner(),
			urlslug:'s1',
			hero:'h1',
			card:'s1',
			social:'social',
			video:'v1',
			callout:'c1',
			description:'d1',
			price:'99',
			shipDate:null,
			closeDate:null,
			salesLadder:[]
		}
	},
	async saveOwner(owner) {
		let me = await userService.getMe();

		return await fetch('/.netlify/functions/save-owner', {
			method: 'POST',
			body: JSON.stringify(owner),
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.text());

	},
	async saveProject(project) {
		let me = await userService.getMe();

		return await fetch('/.netlify/functions/save-project', {
			method: 'POST',
			body: JSON.stringify(project),
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.text());
	},
	async siteRebuild() {
		return await fetch('https://api.netlify.com/build_hooks/5fc69d8cf6603f3bea84651e', { method: 'POST' });
	}

}