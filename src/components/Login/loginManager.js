import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireBase.Config';


export const initializeFramework = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
}

//google Sign In Part
 const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
       firebase.auth()
   .signInWithPopup(googleProvider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            const person = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                isLogin: true
            };
             return person;
        })

        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, credential);
        });
}


//sign Out Google
export const googleHandlePopupSignOut = () => {


    return firebase.auth().signOut()
        .then(() => {

            return user.isLogin;
        })
        .catch((error) => {
            console.log(error);
        });

}

export const createUserWithEmailAndPassword = () => {

  return  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {

            // var user = userCredential.user;
            const successMessageAlert = { userCredential.user };
            successMessageAlert.error = "";
            successMessageAlert.success = true;
            updateUserName(user.name);
            return successMessageAlert;

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
            const errorMessageAlert = { ...user };
            errorMessageAlert.error = errorMessage;
            errorMessageAlert.success = false;
            setUser(errorMessageAlert);

        });
}

export const signInWithEmailAndPassword = () => {

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            const successMessageAlert = { ...user };
            successMessageAlert.error = "";
            successMessageAlert.success = true;
            setUser(successMessageAlert);
            setLoggedInUser(successMessageAlert);
            history.replace(from);
            console.log("update name", user);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
            const errorMessageAlert = { ...user };
            errorMessageAlert.error = errorMessage;
            errorMessageAlert.success = false;
            setUser(errorMessageAlert);
        });
}


const updateUserName = (name) => {

    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
            console.log("successful");

        }).catch(function (error) {
            console.log(error);
        });
}