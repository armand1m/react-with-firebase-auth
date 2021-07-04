import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from 'react';

const Field: React.FC = ({ children }) => (
  <>
    {children}
    <br />
  </>
);

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = Omit<HTMLInputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

const Input = ({ value, onChange, ...props }: InputProps) => (
  <input
    {...props}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const SubmitButton = (props: ButtonProps) => (
  <button {...props}>submit</button>
);

type UserFormProps = {
  onSubmit: (email: string, password: string) => void;
};

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <Field>
        email: <Input value={email} onChange={setEmail} />
      </Field>
      <Field>
        password:{' '}
        <Input
          value={password}
          onChange={setPassword}
          type="password"
        />
      </Field>
      <SubmitButton onClick={() => onSubmit(email, password)} />
    </React.Fragment>
  );
};

export default UserForm;
