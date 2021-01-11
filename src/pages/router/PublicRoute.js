import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import urls from './Urls';

const PublicRoute = ({
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
              pathname: urls.LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
  layout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  pageKey: PropTypes.string
};

export default PublicRoute;
