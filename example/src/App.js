import React from 'react'
import * as firebase from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth'
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
  setError,
  signOut,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
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
      <h1>sign in with google</h1>
      <button onClick={signInWithGoogle}>sign in with google</button>
    </FormWrapper>

    <FormWrapper>
      <h1>sign in with github (disabled but good to see error message)</h1>
      <button onClick={signInWithGithub}>sign in with github</button>
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
      <button onClick={() => setError(null)}>clear error</button>
    </FormWrapper>
  </React.Fragment>
);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
