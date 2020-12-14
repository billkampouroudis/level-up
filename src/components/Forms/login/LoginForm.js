import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
import { Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import PropTypes from 'prop-types';

// Redux Actions
import { clearLoginError, login } from '../../../redux/auth/auth.actions';

const LoginForm = (props) => {
  let history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { authReducer } = props;

  const onLoginClicked = () => {
    props.login({ email, password });
  };

  useEffect(() => {
    props.clearLoginError();
    return () => {
      props.clearLoginError();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authReducer.getTokenError && authReducer.token) {
      history.push(urls.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer.token]);

  return (
    <>
      <Form>
        <Form.Field>
          <CustomTextInput
            placeholder="Email"
            icon="at"
            iconPosition="left"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <CustomTextInput
            placeholder="Password"
            icon="lock"
            iconPosition="left"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>

        <Form.Field className="mb-3 text-center">
          <Button
            type="submit"
            className="custom primary"
            onClick={onLoginClicked}
            loading={authReducer.isGettingToken}
          >
            Είσοδος
          </Button>
        </Form.Field>
      </Form>

      {authReducer.getTokenError && (
        <Message
          negative
          content="Λανθασμένος λογαριασμός email η κωδικός"
          onDismiss={props.clearLoginError}
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
    clearLoginError: () => dispatch(clearLoginError()),
    login: (data) => dispatch(login.call(data))
  };
};

LoginForm.propTypes = {
  authReducer: PropTypes.object,
  login: PropTypes.func,
  clearLoginError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
