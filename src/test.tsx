import 'jest';
import * as React from 'react';
import * as firebase from 'firebase';
import { shallow, mount } from 'enzyme';

import firebaseConfig from './firebase-config';
import withFirebaseAuth, { WrappedComponentProps } from './'

const testApp = firebase.initializeApp(firebaseConfig);
const testAppAuth = testApp.auth();

testAppAuth.signInWithEmailAndPassword = jest.fn();
testAppAuth.createUserWithEmailAndPassword = jest.fn();
// testAppAuth.signInWithGoogle = jest.fn();
// testAppAuth.signInWithFacebook = jest.fn();
// testAppAuth.signInWithGithub = jest.fn();
// testAppAuth.signInWithTwitter = jest.fn();
testAppAuth.signInAnonymously = jest.fn();
testAppAuth.signOut = jest.fn();

describe('withFirebaseAuth', () => {
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
});
