import React from 'react';
import { compose, withState } from 'recompose';

const Field = ({ children }) =>
  <React.Fragment>
    {children}
    <br />
  </React.Fragment>;

const Input = ({ value, onChange, ...props }) =>
  <input
    {...props}
    value={value}
    onChange={event => onChange(event.target.value)}
  />;

const SubmitButton = props =>
  <button {...props}>submit</button>;

const UserForm = ({
  setEmail,
  setPassword,
  email,
  password,
  onSubmit,
}) => (
  <React.Fragment>
    <Field>
      email: <Input value={email} onChange={setEmail} />
    </Field>
    <Field>
      password: <Input value={password} onChange={setPassword} type="password" />
    </Field>
    <SubmitButton onClick={() => onSubmit(email, password)} />
  </React.Fragment>
);

const withUserFormState = compose(
  withState('email', 'setEmail'),
  withState('password', 'setPassword'),
);

export default withUserFormState(UserForm);
