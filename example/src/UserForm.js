import React, { useState } from 'react';

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
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
}

export default UserForm;
