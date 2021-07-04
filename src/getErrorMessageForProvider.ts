import { PossibleProviders } from './';

const providerToTypeMapper = {
  googleProvider: 'firebase.auth.GoogleAuthProvider' as const,
  facebookProvider: 'firebase.auth.FacebookAuthProvider' as const,
  twitterProvider: 'firebase.auth.TwitterAuthProvider' as const,
  githubProvider: 'firebase.auth.GithubAuthProvider' as const,
};

const providerToFirebaseDocs = {
  googleProvider:
    'https://firebase.google.com/docs/auth/web/google-signin' as const,
  facebookProvider:
    'https://firebase.google.com/docs/auth/web/facebook-signin' as const,
  twitterProvider:
    'https://firebase.google.com/docs/auth/web/twitter-signin' as const,
  githubProvider:
    'https://firebase.google.com/docs/auth/web/github-auth' as const,
};

const getErrorMessageForProvider = (provider: PossibleProviders) =>
  `Please provide an instance of ${providerToTypeMapper[provider]} in the withFirebaseAuth HOC providers parameter under the ${provider} key. Check ${providerToFirebaseDocs[provider]} to learn more.`;

export default getErrorMessageForProvider;
