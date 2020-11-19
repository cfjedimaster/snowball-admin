import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://snowball-admin.netlify.app/.netlify/identity",
  audience: "",
  setCookie: true
});

const hash = (document.location.hash || "").replace(/^#\/?/, "");
if (hash) {
  const [key, value] = hash.split("=");
  /*
  if (key === "confirmation_token") handleSignupConfirm(value);
  else if (key === "recovery_token") handleRecovery(value);
  */
  console.log(key);
  if(key === 'invite_token') handleInviteToken(value);
}

function handleInviteToken(token) {

/*
	auth.signup('raymondcamden@gmail.com', 'alldownhillfromhere')
	.then(res => {
		console.log(res);
	});
	*/

	auth
    .confirm(token, true)
    .then(response => {
		console.log(response);
		/*
      window.location.assign("/signup/confirm-success/");
      axios
        .post("/.netlify/functions/activecampaign", {
          email: response.email,
        })
        .then(function (response) {
          // we don't need to do anything
        })
        .catch(function (error) {
          // it's okay, just ignore it
        });
		*/
    })
    .catch(function (e) {
		console.error(e);
    });
	
}
export const userService = {

	login(username,password) {
		//ntl identiy
		console.log('auth',username,password);
		auth.login(username, password, true)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			/*
			if (errorMessage && error.json)
			errorMessage.innerHTML = error.json.error_description;
			else {
			console.log("Failed to login user: %o", error);
			throw error;
			}
			*/
			console.error(error);
		});


	}

}