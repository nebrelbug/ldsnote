$(document).ready(function() {
	
var provider = new firebase.auth.GoogleAuthProvider();
var uid;
var name;
var changeRef = firebase.database().ref('users/');
var userRef;
var signedIn;
var currentUser = firebase.auth().currentUser;

if (currentUser) {
  signedIn = 1;
	uid = currentUser.uid;
	name = currentUser.displayName;
	userRef = firebase.database().ref('users/'+uid);
} else {
  signedIn = 0;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	signedIn = 1;
	uid = user.uid;
	name = user.displayName;
	userRef = firebase.database().ref('users/'+uid);
    	
	
  } else {
    signedIn = 0;
  }
});
	
$( "#login" ).click(function() {
if (signedIn = 0) {
firebase.auth().signInWithRedirect(provider);

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
} if (signedIn = 1) {
	userRef.remove();
	firebase.auth().signOut().then(function() {
  location.reload();
}).catch(function(error) {
  // An error happened.
});
}
});	

});
//V 0.5
