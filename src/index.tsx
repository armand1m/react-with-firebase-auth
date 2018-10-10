import * as React from 'react';
import * as firebase from 'firebase';

export type WrappedComponentProps = {
  signInWithEmailAndPassword: (email: string, password: string) => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  signInWithGithub: () => void;
  signInWithTwitter: () => void;
  signInAnonymously: () => void;
  signOut: () => void;
  setError: (error: any) => void;
  user?: firebase.User;
  error?: firebase.FirebaseError;
};

const withFirebaseAuth = (firebaseAppAuth: firebase.auth.Auth) =>
  (WrappedComponent: React.SFC<WrappedComponentProps>) => {
    return class FirebaseAuthProvider extends React.PureComponent {
      state = {
        user: undefined,
        error: undefined,
      }

      componentDidMount() {
        firebaseAppAuth.onAuthStateChanged((user: firebase.User) => {
          this.setState({ user });
        });
      }

      setError = (error: any) =>
        this.setState({ error });

      tryTo = async (operation: () => void) => {
        try {
          await operation();
        } catch(error) {
          this.setError(error.message);
        }
      }

      createUserWithEmailAndPassword = (email: string, password: string) =>
        this.tryTo(() => firebaseAppAuth.createUserWithEmailAndPassword(email, password));

      signInWithEmailAndPassword = (email: string, password: string) =>
        this.tryTo(() => firebaseAppAuth.signInWithEmailAndPassword(email, password));

      signOut = () =>
        this.tryTo(() => firebaseAppAuth.signOut());

      signInAnonymously = () =>
        this.tryTo(() => firebaseAppAuth.signInAnonymously());

      render() {
        const props = {
          signInWithEmailAndPassword: this.signInWithEmailAndPassword,
          createUserWithEmailAndPassword: this.createUserWithEmailAndPassword,
          /** TODO: plz implement these methods, think about something for the providers, you can do it */
          signInWithGoogle: () => {},
          signInWithFacebook: () => {},
          signInWithGithub: () => {},
          signInWithTwitter: () => {},
          setError: this.setError,
          signInAnonymously: this.signInAnonymously,
          signOut: this.signOut,
          user: this.state.user,
          error: this.state.error,
        };

        return <WrappedComponent {...props} />;
      }
    }
  };

export default withFirebaseAuth;
