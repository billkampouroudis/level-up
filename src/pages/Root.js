import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import Urls from './router/Urls';

import MainLayout from '../components/layouts/MainLayout';

import HomePage from './HomePage';
import LoginRegisterPage from './LoginRegisterPage';
import ProductsPage from './ProductsPage';
import Error404 from './Error404';
import MyCartPage from './MyCartPage';
import MyLevelPage from './MyLevelPage';
import MyOrdersPage from './MyOrdersPage';
import FavoritesPage from './FavoritesPage';

const Root = () => {
  return (
    <Router>
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
          path={Urls.MY_LEVEL}
          component={MyLevelPage}
          layout={MainLayout}
        />

        <PrivateRoute path="*" component={Error404} layout={MainLayout} />
      </Switch>
    </Router>
  );
};

export default Root;
