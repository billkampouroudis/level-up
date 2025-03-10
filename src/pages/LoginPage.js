import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import urls from './router/Urls';
import PropTypes from 'prop-types';

// Components
import Login from '../components/misc/login/Login';
import SEO from '../components/misc/seo/SEO';

const LoginPage = (props) => {
  let history = useHistory();

  const { authReducer } = props;

  useEffect(() => {
    if (authReducer.token) {
      history.push(urls.HOME);
    }
  });

  return (
    <>
      <SEO title="Σύνδεση" />
      <section className="py-0">
        <Login />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

LoginPage.propTypes = {
  authReducer: PropTypes.object,
  login: PropTypes.func,
  token: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
