
/**
 * Makes a request to the server using the provide URL/parameters, and then
 * returns a boolean indicating whether or not it was succesful.  If an error
 * occurs it will be logged, and the user notified.
 */
const makeRequest = async (url, params) => {
	try {
	  const response = await fetch(url, params);
	  // Handle HTTP-level errors
	  if (!response.ok) throw new Error(response.statusText);
  
	  const responseJson = await response.json();
	  // Handle API/data errors
	  if (!responseJson.success) throw new Error(responseJson.message);
	  return true;
	} catch (err) {
	  console.error(err);
	  alert(
		'An error ocurred (please check the console and network tabs of your ' +
		'developer tools).'
	  );
	}
	return false;
  };


/**
 * Helper function for making GraphQL queries/mutations
 * (We could use a library like Lokka, but plain old fetch works fine for this
 * example.)
 */
const makeQuery = async (query, variables = {}) => {
	// Use string methods to extrat the root field from a query. Normally you
	//  would NOT do things this way ... at all. This is just a hack  to avoid
	// depending on a proper library (eg. Lokka), to keep this example simpler.
	let rootField = query.trim()
	if (rootField.includes('$')) {
	  rootField = rootField.substr(rootField.indexOf('{') + 1)
	  // rootField = rootField.substr(rootField.lastIndexOf('}') + 1)
	  rootField.substr(0, rootField.lastIndexOf('(')).trim()
	}
	rootField = rootField.substr(rootField.startsWith('mutation') ? 10 : 1);
	rootField = rootField.split('{')[0].split('(')[0].trim();
  
	const response = await fetch('http://localhost:4000/api', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ query, variables }),
	})
	const json = await response.json();
	const { data, errors } = json;
	if (errors) {
	  alert('An error occurred');
	  console.error(errors);
	}
  
	return data[rootField];
  };
  

const login = async e => {
	e.preventDefault();

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
	  //document.querySelector('#login-failure').style.display = 'block'
	  alert("Unable to login");
	  return
	}
	setCurrentUser(user);
	$('#login-dialog').modal('hide');
}


const logout = async e => {
	e.preventDefault();

	const mutation = `mutation  {
	  logout { successful }
	}`;
	const user = await makeQuery(mutation);
	setCurrentUser(null);
  }
  
  const signup = async e => {
	e.preventDefault();

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
	// document.querySelector('#signup-failure').style.display =
	//   signedUpUser ? 'none' : 'block';
	if (!signedUpUser) return;
	setCurrentUser(signedUpUser);
	$('#signup-dialog').modal('hide');
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
  