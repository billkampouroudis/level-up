import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Urls from './Urls';

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  isAuthenticated = true,
  ...rest
}) => {
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
              pathname: Urls.LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  layout: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  pageKey: PropTypes.string
};

export default PrivateRoute;
