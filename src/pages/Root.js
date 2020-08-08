import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import Urls from './router/Urls';

import MainLayout from '../components/layouts/MainLayout';

import HomePage from './HomePage';
import LoginRegisterPage from './LoginRegisterPage';
import ProductsPage from './ProductsPage';
import Error404 from './Error404';

const Root = () => {
  return (
    <Router>
      <Link to={Urls.HOME}>Home</Link>
      <Link to={Urls.LOGIN}>login</Link>

      <Switch>
        <PrivateRoute
          path={Urls.HOME}
          component={HomePage}
          layout={MainLayout}
          exact
        />
        <PrivateRoute
          path={Urls.LOGIN}
          component={LoginRegisterPage}
          layout={MainLayout}
        />
        <PrivateRoute
          path={Urls.PRODUCTS}
          component={ProductsPage}
          layout={MainLayout}
        />
        <PrivateRoute path="*" component={Error404} layout={MainLayout} />
      </Switch>
    </Router>
  );
};

export default Root;
