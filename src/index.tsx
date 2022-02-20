import React from 'react';
import firebase from 'firebase';

import getErrorMessageForProvider from './getErrorMessageForProvider';

export type WrappedComponentProps = {
  signInWithEmailAndPassword: (email: string, password: string) => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  signInWithGithub: () => void;
  signInWithTwitter: () => void;
  signInWithApple: () => void;
  signInWithPhoneNumber: (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ) => void;
  signInAnonymously: () => void;
  signOut: () => void;
  setError: (error: string | null) => void;
  user?: firebase.User | null;
  error?: string;
  loading: boolean;
};

export type PossibleProviders = keyof ProvidersMapper;

export type ProvidersMapper = {
  googleProvider?: firebase.auth.GithubAuthProvider_Instance;
  facebookProvider?: firebase.auth.FacebookAuthProvider_Instance;
  twitterProvider?: firebase.auth.TwitterAuthProvider_Instance;
  githubProvider?: firebase.auth.GithubAuthProvider_Instance;
  appleProvider?: firebase.auth.OAuthProvider;
};

export type HocParameters = {
  firebaseAppAuth: firebase.auth.Auth;
  providers?: ProvidersMapper;
};

export type FirebaseAuthProviderState = {
  loading: boolean;
  user?: firebase.User | null;
  error?: string | null;
};

const withFirebaseAuth = ({
  firebaseAppAuth,
  providers = {},
}: HocParameters) => {
  return function createComponentWithAuth<P>(
    WrappedComponent: React.ComponentType<P & WrappedComponentProps>
  ) {
    return class FirebaseAuthProvider extends React.PureComponent<
      P,
      FirebaseAuthProviderState
    > {
      static displayName = `withFirebaseAuth(${
        WrappedComponent.displayName || WrappedComponent.name
      })`;

      state = {
        loading: false,
        user: undefined,
        error: undefined,
      };

      unsubscribeAuthStateListener: firebase.Unsubscribe | undefined;

      componentDidMount() {
        this.unsubscribeAuthStateListener = firebaseAppAuth.onAuthStateChanged(
          (user) => this.setState({ user })
        );
      }

      componentWillUnmount() {
        if (this.unsubscribeAuthStateListener) {
          this.unsubscribeAuthStateListener();
        }
      }

      setError = (error: string | null) => this.setState({ error });

      toggleLoading = () => {
        this.setState((currState) => ({ loading: !currState.loading }));
      };

      async tryTo<T>(operation: () => Promise<T>) {
        try {
          this.toggleLoading();
          const result = await operation();
          return result;
        } catch (error) {
          this.setError(error.message);
          return error as firebase.auth.Error;
        } finally {
          this.toggleLoading();
        }
      }

      tryToSignInWithProvider = (provider: PossibleProviders) =>
        this.tryTo<firebase.auth.UserCredential>(() => {
          const providerInstance = providers[provider];

          if (!providerInstance) {
            throw new Error(getErrorMessageForProvider(provider));
          }

          return firebaseAppAuth.signInWithPopup(providerInstance);
        });

      signOut = () => {
        return this.tryTo<void>(() => firebaseAppAuth.signOut());
      };

      signInAnonymously = () => {
        return this.tryTo<firebase.auth.UserCredential>(() =>
          firebaseAppAuth.signInAnonymously()
        );
      };

      signInWithGithub = () => this.tryToSignInWithProvider('githubProvider');

      signInWithTwitter = () => this.tryToSignInWithProvider('twitterProvider');

      signInWithGoogle = () => this.tryToSignInWithProvider('googleProvider');

      signInWithFacebook = () =>
        this.tryToSignInWithProvider('facebookProvider');

      signInWithApple = () => this.tryToSignInWithProvider('appleProvider');

      signInWithEmailAndPassword = (email: string, password: string) => {
        return this.tryTo<firebase.auth.UserCredential>(() =>
          firebaseAppAuth.signInWithEmailAndPassword(email, password)
        );
      };

      signInWithPhoneNumber = (
        phoneNumber: string,
        applicationVerifier: firebase.auth.ApplicationVerifier
      ) => {
        return this.tryTo<firebase.auth.ConfirmationResult>(() =>
          firebaseAppAuth.signInWithPhoneNumber(
            phoneNumber,
            applicationVerifier
          )
        );
      };

      createUserWithEmailAndPassword = (email: string, password: string) => {
        return this.tryTo<firebase.auth.UserCredential>(() =>
          firebaseAppAuth.createUserWithEmailAndPassword(email, password)
        );
      };

      sharedHandlers = {
        createUserWithEmailAndPassword: this.createUserWithEmailAndPassword,
        signInWithEmailAndPassword: this.signInWithEmailAndPassword,
        signInWithGithub: this.signInWithGithub,
        signInWithTwitter: this.signInWithTwitter,
        signInWithGoogle: this.signInWithGoogle,
        signInWithFacebook: this.signInWithFacebook,
        signInWithApple: this.signInWithApple,
        signInWithPhoneNumber: this.signInWithPhoneNumber,
        signInAnonymously: this.signInAnonymously,
        setError: this.setError,
        signOut: this.signOut,
      };

      render() {
        const props = {
          ...this.props,
          ...this.sharedHandlers,
          loading: this.state.loading,
          user: this.state.user,
          error: this.state.error,
        };

        return <WrappedComponent {...props} />;
      }
    };
  };
};

export default withFirebaseAuth;
