import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import Urls from './router/urls';
import PropTypes from 'prop-types';

// Components
import MainLayout from '../components/layouts/main/MainLayout';
import EmptyLayout from '../components/layouts/empty/EmptyLayout';

// Pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProductPage from './ProductPage';
import Error404 from './Error404';
import MyCartPage from './MyCartPage';
import MyOrdersPage from './MyOrdersPage';
import FavoritesPage from './FavoritesPage';
import MyAccountPage from './MyAccountPage';
import StorePage from './StorePage';

// Redux Actions
import { getUser } from '../redux/user/user.actions';

const Root = (props) => {
  useEffect(() => {
    if (props.authReducer.token) {
      props.getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Switch>
        <PublicRoute
          path={Urls.HOME}
          component={HomePage}
          layout={MainLayout}
          exact
        />
        <PublicRoute
          path={Urls.LOGIN}
          component={LoginPage}
          layout={EmptyLayout}
        />
        <PublicRoute
          path={Urls.REGISTER}
          component={RegisterPage}
          layout={EmptyLayout}
        />
        <PublicRoute
          path={`${Urls.PRODUCTS}/:id?`}
          component={ProductPage}
          layout={MainLayout}
        />
        <PrivateRoute
          path={Urls.MY_CART}
          component={MyCartPage}
          layout={MainLayout}
        />
        <PrivateRoute
          path={Urls.FAVORITES}
          component={FavoritesPage}
          layout={MainLayout}
        />
        <PrivateRoute
          path={Urls.MY_ORDERS}
          component={MyOrdersPage}
          layout={MainLayout}
        />
        <PrivateRoute
          path={Urls.MY_ACCOUNT}
          component={MyAccountPage}
          layout={MainLayout}
        />
        <PublicRoute
          path={`${Urls.STORES}/:id?`}
          component={StorePage}
          layout={MainLayout}
        />
        <PublicRoute
          path={Urls.NOT_FOUND}
          component={Error404}
          layout={MainLayout}
        />
        <PublicRoute path="*" component={Error404} layout={MainLayout} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { authReducer: state.authReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser.call(id))
  };
};

Root.propTypes = {
  getUser: PropTypes.func,
  authReducer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
