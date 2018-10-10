import React from 'react'
import * as firebase from 'firebase';
import withFirebaseAuth from 'react-firebase-hoc'
import firebaseConfig from './firebaseConfig';
import UserForm from './UserForm';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const FormWrapper = ({ children }) =>
  <React.Fragment>
    {children}
    <hr />
  </React.Fragment>;

const App = ({
  user,
  error,
  clearError,
  signOut,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
}) => (
  <React.Fragment>
    <FormWrapper>
      <h1>create user</h1>
      <UserForm onSubmit={createUserWithEmailAndPassword} />
    </FormWrapper>

    <FormWrapper>
      <h1>sign in</h1>
      <UserForm onSubmit={signInWithEmailAndPassword} />
    </FormWrapper>

    <FormWrapper>
      <h1>sign in anonymously</h1>
      <button onClick={signInAnonymously}>sign in anonymously</button>
    </FormWrapper>

    <FormWrapper>
      <h1>sign out</h1>
      <button onClick={signOut}>sign out</button>
    </FormWrapper>

    <FormWrapper>
      <h1>user data</h1>
      <textarea value={JSON.stringify(user)} />
    </FormWrapper>

    <FormWrapper>
      <h1>error data</h1>
      <textarea value={JSON.stringify(error)} />
    </FormWrapper>

    <FormWrapper>
      <h1>clear error</h1>
      <button onClick={clearError}>clear error</button>
    </FormWrapper>
  </React.Fragment>
);

export default withFirebaseAuth(firebaseApp.auth())(App);
