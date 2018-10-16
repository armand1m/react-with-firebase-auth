import { PossibleProviders } from './';

const providerToTypeMapper = {
  googleProvider: 'firebase.auth.GoogleAuthProvider',
  facebookProvider: 'firebase.auth.FacebookAuthProvider',
  twitterProvider: 'firebase.auth.TwitterAuthProvider',
  githubProvider: 'firebase.auth.GithubAuthProvider'
};

const providerToFirebaseDocs = {
  googleProvider: 'https://firebase.google.com/docs/auth/web/google-signin',
  facebookProvider: 'https://firebase.google.com/docs/auth/web/facebook-signin',
  twitterProvider: 'https://firebase.google.com/docs/auth/web/twitter-signin',
  githubProvider: 'https://firebase.google.com/docs/auth/web/github-auth'
};

const getErrorMessageForProvider = (provider: PossibleProviders) =>
  `Please provide an instance of ${providerToTypeMapper[provider]} in the withFirebaseAuth HOC providers parameter under the ${provider} key. Check ${providerToFirebaseDocs[provider]} to learn more.`;

export default getErrorMessageForProvider;
