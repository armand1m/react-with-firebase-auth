import 'jest';
import * as React from 'react';
import * as firebase from 'firebase';
import { shallow, mount } from 'enzyme';

import withFirebaseAuth, { WrappedComponentProps } from './'

const testAppAuth: firebase.auth.Auth = {} as firebase.auth.Auth;

const providers = {
  googleProvider: {} as firebase.auth.GoogleAuthProvider_Instance,
  twitterProvider: {} as firebase.auth.TwitterAuthProvider_Instance,
  githubProvider: {} as firebase.auth.GithubAuthProvider_Instance,
  facebookProvider: {} as firebase.auth.FacebookAuthProvider_Instance,
};

const fakeUser = {
  displayName: 'fake'
};

describe('withFirebaseAuth', () => {
  let currentAuthStateObserver = (_user: firebase.User) => {};
  let unsubcribeAuthStateChangeMock = jest.fn();

  beforeEach(() => {
    unsubcribeAuthStateChangeMock = jest.fn();

    testAppAuth.signInWithEmailAndPassword = jest.fn();
    testAppAuth.createUserWithEmailAndPassword = jest.fn();
    testAppAuth.signInAnonymously = jest.fn();
    testAppAuth.signOut = jest.fn();
    testAppAuth.signInWithPopup = jest.fn();
    testAppAuth.onAuthStateChanged = jest.fn(observer => {
      currentAuthStateObserver = observer;
      return unsubcribeAuthStateChangeMock;
    });
  })

  it('should be a function', () => {
    expect(typeof withFirebaseAuth).toBe('function');
  });

  it('should render WrappedComponent', () => {
    const WrappedComponent = () => <div>ama wrapped</div>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = shallow(<EnhancedComponent />);

    expect(wrapped.find(WrappedComponent).exists()).toBeTruthy();
  });

  it('should setup onAuthStateChange listener when mounting the component', () => {
    const WrappedComponent = () => <div>ama wrapped</div>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    mount(<EnhancedComponent />);

    expect(testAppAuth.onAuthStateChanged).toHaveBeenCalledTimes(1);
  });

  it('should call onAuthStateChange unsubscriber when unmounting the component', () => {
    const WrappedComponent = () => <div>ama wrapped</div>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.unmount();

    expect(unsubcribeAuthStateChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should update user in state when currentAuthStateObserver is invoked', () => {
    const WrappedComponent = () => <div>ama wrapped</div>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    expect(wrapped.state('user')).toBeUndefined();

    currentAuthStateObserver(fakeUser as firebase.User);

    expect(wrapped.state('user')).toBe(fakeUser);
  })

  it('should call signInAnonymously when prop is invoked', () => {
    const WrappedComponent = ({ signInAnonymously }: WrappedComponentProps) =>
      <button onClick={signInAnonymously}>signInAnonymously</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInAnonymously).toHaveBeenCalled();
  });

  it('should call signOut when prop is invoked', () => {
    const WrappedComponent = ({ signOut }: WrappedComponentProps) =>
      <button onClick={signOut}>signOut</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signOut).toHaveBeenCalled();
  });

  it('should call signInWithEmailAndPassword when prop is invoked', () => {
    const WrappedComponent = ({ signInWithEmailAndPassword }: WrappedComponentProps) =>
      <button onClick={() => signInWithEmailAndPassword('test', 'test')}>signInWithEmailAndPassword</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call signInWithPopup with googleProvider instance when signInWithGoogle prop is invoked', () => {
    const WrappedComponent = ({ signInWithGoogle }: WrappedComponentProps) =>
      <button onClick={() => signInWithGoogle()}>signInWithGoogle</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
      providers,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInWithPopup).toHaveBeenCalledWith(providers.googleProvider);
  });

  it('should call signInWithPopup with twitterProvider instance when signInWithTwitter prop is invoked', () => {
    const WrappedComponent = ({ signInWithTwitter }: WrappedComponentProps) =>
      <button onClick={() => signInWithTwitter()}>signInWithTwitter</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
      providers,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInWithPopup).toHaveBeenCalledWith(providers.twitterProvider);
  });

  it('should call signInWithPopup with facebookProvider instance when signInWithFacebook prop is invoked', () => {
    const WrappedComponent = ({ signInWithFacebook }: WrappedComponentProps) =>
      <button onClick={() => signInWithFacebook()}>signInWithFacebook</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
      providers,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInWithPopup).toHaveBeenCalledWith(providers.facebookProvider);
  });

  it('should call signInWithPopup with githubProvider instance when signInWithGithub prop is invoked', () => {
    const WrappedComponent = ({ signInWithGithub }: WrappedComponentProps) =>
      <button onClick={() => signInWithGithub()}>signInWithGithub</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
      providers,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.signInWithPopup).toHaveBeenCalledWith(providers.githubProvider);
  });

  it('should call createUserWithEmailAndPassword when prop is invoked', () => {
    const WrappedComponent = ({ createUserWithEmailAndPassword }: WrappedComponentProps) =>
      <button onClick={() => createUserWithEmailAndPassword('test', 'test')}>createUserWithEmailAndPassword</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(testAppAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should set an error when setError is invoked', () => {
    const WrappedComponent = ({ setError, error }: WrappedComponentProps) => (
      <>
        <button onClick={() => setError('test-error')}>setError</button>
        <span>{error}</span>
      </>
    );

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    expect(wrapped.find('span').text()).toBe('');
    wrapped.find('button').simulate('click');
    expect(wrapped.find('span').text()).toBe('test-error');
  });

  it('should set an error when trying to call a login provider without providing its instance', () => {
    const WrappedComponent = ({ signInWithGithub }: WrappedComponentProps) =>
      <button onClick={() => signInWithGithub()}>signInWithGithub</button>;

    const EnhancedComponent = withFirebaseAuth({
      firebaseAppAuth: testAppAuth,
    })(WrappedComponent);

    const wrapped = mount(<EnhancedComponent />);

    wrapped.find('button').simulate('click');

    expect(wrapped.state('error')).toContain('Please provide an instance of firebase.auth.GithubAuthProvider')
  });
});
