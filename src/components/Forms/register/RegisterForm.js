import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { handleOnBlur, handleOnKeyUp } from '../../../utils/validation';

// Components
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
const RegisterForm = (props) => {
  const [inputs, setInputs] = useState({
    email: {
      placeholder: 'Email',
      value: '',
      rules: {
        notEmpty: true,
        email: true,
        maxLength: 100
      },
      errorMessage: ''
    },
    password: {
      placeholder: 'Password',
      value: '',
      rules: {
        notEmpty: true,
        password: true
      },
      errorMessage: ''
    }
  });

  const onRegister = () => {
    console.warn('Unimplemented');
  };

  return (
    <Form>
      <Form.Field>
        <CustomTextInput
          placeholder={inputs.email.placeholder}
          icon="at"
          iconPosition="left"
          onKeyUp={(e) => setInputs(handleOnKeyUp(e, 'email', inputs))}
          onBlur={(e) => setInputs(handleOnBlur(e, 'email', inputs))}
          errorMessage={inputs.email.errorMessage}
        />
      </Form.Field>
      <Form.Field>
        <CustomTextInput
          placeholder={inputs.password.placeholder}
          icon="lock"
          iconPosition="left"
          type="password"
          onKeyUp={(e) => setInputs(handleOnKeyUp(e, 'password', inputs))}
          onBlur={(e) => setInputs(handleOnBlur(e, 'password', inputs))}
          errorMessage={inputs.password.errorMessage}
        />
      </Form.Field>

      <Form.Field className="mb-3 text-center">
        <Button type="submit" className="custom primary" onClick={onRegister}>
          Εγγραφή
        </Button>
      </Form.Field>
    </Form>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
