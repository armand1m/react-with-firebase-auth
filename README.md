# react-with-firebase-auth

[![NPM](https://img.shields.io/npm/v/react-with-firebase-auth.svg)](https://www.npmjs.com/package/react-with-firebase-auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/armand1m/react-with-firebase-auth.svg?branch=master)](https://travis-ci.org/armand1m/react-with-firebase-auth)
[![codecov](https://codecov.io/gh/armand1m/react-with-firebase-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/armand1m/react-with-firebase-auth)
[![bundlephobia](https://badgen.net/bundlephobia/min/react-with-firebase-auth)](https://bundlephobia.com/result?p=react-with-firebase-auth)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/react-with-firebase-auth)](https://bundlephobia.com/result?p=react-with-firebase-auth)
[![devdependencies](https://badgen.net/david/dev/armand1m/react-with-firebase-auth)](https://david-dm.org/armand1m/react-with-firebase-auth?type=dev)
[![peerdependencies](https://badgen.net/david/peer/armand1m/react-with-firebase-auth)](https://david-dm.org/armand1m/react-with-firebase-auth?type=peer) [![Greenkeeper badge](https://badges.greenkeeper.io/armand1m/react-with-firebase-auth.svg)](https://greenkeeper.io/)

> Higher Order Component for integrating Firebase with a React Component

This library makes a `withFirebaseAuth()` function available to you.

 - [Signature](#signature)
 - [Usage](#usage)
 - [Examples](#examples)
 - [Articles](#articles)
 - [License](#license)

## Signature

```ts
type HocParameters = {
  firebaseAppAuth: firebase.auth.Auth,
  providers?: {
    googleProvider?: firebase.auth.GoogleAuthProvider_Instance;
    facebookProvider?: firebase.auth.FacebookAuthProvider_Instance;
    twitterProvider?: firebase.auth.TwitterAuthProvider_Instance;
    githubProvider?:  firebase.auth.GithubAuthProvider_Instance;
  }
};

withFirebaseAuth(props: HocParameters): HigherOrderComponent
```

## Usage

Install it first using NPM:


```bash
npm install --save react-with-firebase-auth
```

Then use it in your components:

```tsx
import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
  signInAnonymously,
  signOut,
  setError,
  user,
  error,
}: WrappedComponentProps) => (
  <React.Fragment>
    {
      user
        ? <h1>Hello, {user.displayName}</h1>
        : <h1>Log in</h1>
    }

    {
      user
        ? <button onClick={signOut}>Sign out</button>
        : <button onClick={signInWithGoogle}>Sign in with Google</button>
    }
  </React.Fragment>
);

const firebaseAppAuth = firebaseApp.auth();

/** See the signature above to find out the available providers */
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
/** providers can be customised as per the Firebase documentation on auth providers **/
providers.googleProvider.setCustomParameters({hd:"mycompany.com"});

/** Wrap it */
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
```

## Examples

There are a few source code examples available:

 - [armand1m/react-with-firebase-auth/tree/master/example](https://github.com/armand1m/react-with-firebase-auth/tree/master/example)
 - [armand1m/react-firebase-authentication-medium](https://github.com/armand1m/react-firebase-authentication-medium)

You can also check a live demo example here:

 - https://armand1m.github.io/react-with-firebase-auth/

## Articles

 - ["How to setup Firebase Authentication with React in 5 minutes (maybe 10)"](https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834)

## License

MIT © [Armando Magalhaes](https://github.com/armand1m)
