import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import urls from './urls';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  isAuthenticated = true,
  authReducer,
  ...rest
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!authReducer.token) {
      history.push(urls.HOME);
    }
  }, [history, authReducer.token]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: urls.LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
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

PrivateRoute.propTypes = {
  authReducer: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
  layout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  pageKey: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
