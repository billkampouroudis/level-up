import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Subtract32, Add32 } from '@carbon/icons-react';
import { Form } from 'semantic-ui-react';
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';

const LoginForm = (props) => {
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

      <div className="text-center">
        <Form.Field className="mb-3">
          <Button type="submit" className="custom primary" onClick={onLogin}>
            Είσοδος
          </Button>
        </Form.Field>
        <Form.Field className="mb-3">
          <Link to={Urls.REGISTER}>Δημιουργία λογαριασμού</Link>
        </Form.Field>

        <Form.Field>
          <Link to={Urls.RESET_PASSWORD} className="text-grey-light">
            Ξέχασα τον κωδικό μου
          </Link>
        </Form.Field>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
