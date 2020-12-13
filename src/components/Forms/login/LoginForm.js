import React from 'react';
import { Form } from 'semantic-ui-react';
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
import { Button } from 'semantic-ui-react';

const LoginForm = () => {
  const onLogin = () => {
    alert('Success');
  };

  return (
    <Form>
      <Form.Field>
        <CustomTextInput placeholder="Email" icon="at" iconPosition="left" />
      </Form.Field>
      <Form.Field>
        <CustomTextInput
          placeholder="Password"
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>

      <Form.Field className="mb-3 text-center">
        <Button type="submit" className="custom primary" onClick={onLogin}>
          Είσοδος
        </Button>
      </Form.Field>
    </Form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
