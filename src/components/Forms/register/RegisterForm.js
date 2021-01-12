import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Utils
import {
  validateAll,
  haveErrors,
  handleOnBlur,
  handleOnKeyUp
} from '../../../utils/validation';

// Components
import { Row, Col } from 'react-bootstrap';
import { Message } from 'semantic-ui-react';
import CustomTextInput from '../../formElements/textInput/CustomTextInput';

// Redux Actions
import { register, clearRegisterError } from '../../../redux/auth/auth.actions';
import urls from '../../../pages/router/Urls';

const RegisterForm = (props) => {
  let history = useHistory();

  const [inputs, setInputs] = useState({
    firstName: {
      placeholder: 'Όνομα',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 45
      },
      errorMessage: '',
      name: 'firstName'
    },
    lastName: {
      placeholder: 'Επώνυμο',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 45
      },
      errorMessage: '',
      name: 'lastName'
    },
    email: {
      placeholder: 'Email',
      value: '',
      rules: {
        notEmpty: true,
        email: true,
        maxLength: 100
      },
      errorMessage: '',
      name: 'email'
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

  const onRegisterClicked = () => {
    const validatedInputs = validateAll(inputs);
    setInputs(validatedInputs);

    if (haveErrors(validatedInputs)) {
      return;
    }

    const firstName = inputs.firstName.value;
    const lastName = inputs.lastName.value;
    const email = inputs.email.value;
    const password = inputs.password.value;

    props.register({ firstName, lastName, email, password });
  };

  useEffect(() => {
    if (props.authReducer.token) {
      history.push(urls.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.authReducer.token]);

  useEffect(() => {
    if (props.authReducer.token) {
      history.push(urls.HOME);
    }
    props.clearRegisterError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <Form.Field>
              <CustomTextInput
                placeholder={inputs.firstName.placeholder}
                icon="user"
                iconPosition="left"
                onKeyUp={(e) =>
                  setInputs(handleOnKeyUp(e, 'firstName', inputs))
                }
                onBlur={(e) => setInputs(handleOnBlur(e, 'firstName', inputs))}
                errorMessage={inputs.firstName.errorMessage}
                name={inputs.firstName.name}
              />
            </Form.Field>
          </Col>
          <Col xs={12} md={6}>
            <Form.Field>
              <CustomTextInput
                placeholder={inputs.lastName.placeholder}
                icon="user"
                iconPosition="left"
                onKeyUp={(e) => setInputs(handleOnKeyUp(e, 'lastName', inputs))}
                onBlur={(e) => setInputs(handleOnBlur(e, 'lastName', inputs))}
                errorMessage={inputs.lastName.errorMessage}
                name={inputs.lastName.name}
              />
            </Form.Field>
          </Col>
          <Col xs={12}>
            <Form.Field>
              <CustomTextInput
                placeholder={inputs.email.placeholder}
                icon="at"
                iconPosition="left"
                onKeyUp={(e) => setInputs(handleOnKeyUp(e, 'email', inputs))}
                onBlur={(e) => setInputs(handleOnBlur(e, 'email', inputs))}
                errorMessage={inputs.email.errorMessage}
                name={inputs.email.name}
              />
            </Form.Field>
          </Col>
          <Col xs={12}>
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
          </Col>
          <Col xs={12}>
            <Form.Field className="mb-3 text-center">
              <Button
                type="submit"
                className="custom primary"
                onClick={onRegisterClicked}
              >
                Εγγραφή
              </Button>
            </Form.Field>
          </Col>
        </Row>
      </Form>
      {props.authReducer.registerError && (
        <Message
          negative
          content={'Το email αυτό χρησιμοποιείται ήδη.'}
          onDismiss={() => props.clearRegisterError()}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register.call(data)),
    clearRegisterError: () => dispatch(clearRegisterError())
  };
};

RegisterForm.propTypes = {
  authReducer: PropTypes.object,
  register: PropTypes.func,
  clearRegisterError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
