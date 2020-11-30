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

	async getProjects() {

		let me = await userService.getMe();
		return await fetch('/.netlify/functions/get-projects', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + me.token.access_token
			},
		}).then((res) => res.json());

	}

}