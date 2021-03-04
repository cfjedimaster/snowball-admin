import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://snowball-admin.netlify.app/.netlify/identity",
  audience: "",
  setCookie: true
});

/*
this is how you fake add a user
auth.signup('raymondcamden@gmail.com', 'remove')
.then(res => {
	console.log(res);
})
.catch(e => {
	console.log('e', e);
});
*/


export const userService = {

	async login(username,password) {
		//ntl identiy
		console.log('auth',username,password);
		return auth.login(username,password,true);
		/*
		auth.login(username, password, true)
		.then(response => {
			console.log(response);
			return true;
		})
		.catch(error => {
			
			if (errorMessage && error.json)
			errorMessage.innerHTML = error.json.error_description;
			else {
			console.log("Failed to login user: %o", error);
			throw error;
			}
			
			console.error(error);
		});
		*/

	},
	getMe() {
		return auth.currentUser();
	},
	isLoggedIn() {
		let user = auth.currentUser();
		if(!user) return false;
		//force refresh if need be
		user.jwt();
		return !!auth.currentUser();
	},
	async logout() {
		return this.getMe().logout();
	}

}