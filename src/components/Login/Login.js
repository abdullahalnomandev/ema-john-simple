import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireBase.Config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}

const Login = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isLogin: false,
    email: '',
    password: '',
    error: '',
    name: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //google Sign In Part
  const googleHandlePopupSinIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        const person = { name: user.displayName, email: user.email, photo: user.photoURL, isLogin: true }
        // setUser(person);
        setLoggedInUser(person);
        history.replace(from);
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
  const googleHandlePopupSignOut = () => {


    firebase.auth().signOut()
      .then(() => {

        setUser(user.isLogin)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  //input Click Handler
  const inputClickHandler = (e) => {

    let isValid = true;

    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      isValid = /\d{1}/.test(e.target.value) && e.target.value.length > 6;
    }

    if (isValid) {
      const userUpdate = { ...user }
      userUpdate[e.target.name] = e.target.value;
      setUser(userUpdate);
    }

  }

  //Submit FOrm

  const submitForm = (e) => {

    if (newUser && user.email && user.password) {

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {

          // var user = userCredential.user;
          const successMessageAlert = { ...user };
          successMessageAlert.error = "";
          successMessageAlert.success = true;
          setUser(successMessageAlert)
          updateUserName(user.name);

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

    if (!newUser && user.email && user.password) {

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

    e.preventDefault();

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
  //return part
  return (
    <div style={{ textAlign: 'center' }}>
      {/* {
        user.isLogin &&
        <div>
          <img src={user.photo} alt="" />
          <h1>Name: {user.name}</h1>
          <p>email : {user.email}</p>
        </div>
      } */}
      {
        user.isLogin ? <button onClick={googleHandlePopupSignOut}>Log Out</button> :
          <button onClick={googleHandlePopupSinIn}>Open With Google</button>
      }

      <br />
      <br />

        {/* <p>name: {user.name}</p>
        <p>e-mail:{user.email}</p>
        <p>Password:{user.password}</p> */}

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="userLogIn" id="" />

      <label htmlFor="userLogIn">New User Registaiton</label><br />

      <form onSubmit={submitForm}>
        {
          newUser && <input name="name" onBlur={inputClickHandler} type="text" placeholder="name" />
        }
        <br /><br />
        <input type="text" name="email" onBlur={inputClickHandler} placeholder="E-mail" required /><br /><br />
        <input type="password" name="password" onBlur={inputClickHandler} placeholder="Password" required /><br /><br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign IN'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green', fontSize: '30px' }}> User {newUser ? 'Created' : 'Logged In'} successfully</p>
      }


    </div>
  );
};

export default Login;