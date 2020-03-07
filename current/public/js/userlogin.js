const login = async e => {
	console.log("Abt to login");
	// document.querySelector('#login-dialog').style.display = 'block'
	const credentials = {
	  username: document.querySelector('#login-username').value,
	  password: document.querySelector('#login-password').value,
	};
	const mutation = `mutation ($credentials: LoginInput!) {
	  login(loginInput: $credentials) {
		displayName
		username
	  }
	}`;
	const user = await makeQuery(mutation, { credentials });
	if (!user) {
	  document.querySelector('#login-failure').style.display = 'block'
	  return
	}
	setCurrentUser(user);
	$('#login-dialog').modal('hide');
}


const logout = async e => {
	console.log("Abt to logout");
	const mutation = `mutation  {
	  logout { wasSuccessful }
	}`;
	const user = await makeQuery(mutation);
	setCurrentUser(null);
  }
  
  const signup = async e => {
	console.log("Abt to signup");
	const user = {
	  displayName: document.querySelector('#display_name').value,
	  email: document.querySelector('#email_address').value,
	  username: document.querySelector('#signup-username').value,
	  password: document.querySelector('#signup-password').value,
	};
	const mutation = `mutation ($user: UserInput!) {
	  signup(user: $user) {
		displayName
		username
	  }
	}`;
	const signedUpUser = await makeQuery(mutation, { user });
	document.querySelector('#signup-failure').style.display =
	  signedUpUser ? 'none' : 'block';
	if (!signedUpUser) return;
	setCurrentUser(signedUpUser);
	$('#signup-dialog').modal('hide');
  };
  
  const requestReset = async e => {
	console.log("Abt to reset");
	e.preventDefault();
	const username = document.querySelector('#login-username').value;
	const mutation = `mutation ($username: String!) {
	  requestPasswordReset(username: $username) {
		wasSuccessful
	  }
	}`;
	const { wasSuccessful } = await makeQuery(mutation, { username });
	if (wasSuccessful) alert('A reset email has been sent');
	else alert('I\'m sorry, an error ocurred while resetting your password');
  }
  
  const resetPassword = async e => {
	const resetInput = {
	  username: document.querySelector('#reset-username').value,
	  password: document.querySelector('#reset-password').value,
	  key: document.querySelector('#key').value
	};
	const mutation = `mutation ($resetInput: PasswordResetInput!) {
	  resetPassword(resetInput: $resetInput) {
		displayName
		username
	  }
	}`;
	const user = await makeQuery(mutation, { resetInput });
	if (!user) {
	  document.querySelector('#reset-failure').style.display = 'block';
	  return;
	}
	setCurrentUser(user);
	$('#reset-dialog').modal('hide');
  };



  
const setCurrentUser = currentUser => {
	if (currentUser) {
	  document.querySelector('#loginBox').style.display = 'none';
	  document.querySelector('#logoutBox').style.display = 'block';
	} else {
	  document.querySelector('#logoutBox').style.display = 'none';
	  document.querySelector('#loginBox').style.display = 'block';
	}
	return document.querySelector('#welcome-message').innerText =
	  currentUser ? `Welcome ${currentUser.username}!` : '';
  };
  