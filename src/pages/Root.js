import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import urls from './router/Urls';
import PropTypes from 'prop-types';

// Utils
import { calculateUserLevel } from '../utils/levels/levels';

// Components
import MainLayout from '../components/layouts/main/MainLayout';
import EmptyLayout from '../components/layouts/empty/EmptyLayout';
import LevelUpModal from '../components/modals/level/LevelUpModal';

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
import AboutPage from './AboutPage';

// Redux Actions
import { getUser, userCleanup } from '../redux/user/user.actions';

const Root = (props) => {
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const [userXP, setUserXP] = useState(0);

  const { authReducer, userReducer } = props;

  useEffect(() => {
    if (!authReducer.token) {
      return;
    }

    if (
      userReducer.user.xp > userXP &&
      calculateUserLevel(userReducer.user.xp) > calculateUserLevel(userXP)
    ) {
      setLevelUpModalOpen(true);
    }

    setUserXP(userReducer.user.xp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReducer.user.xp]);

  useEffect(() => {
    if (authReducer.token) {
      props.getUser();
    } else {
      props.userCleanup();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer.token]);

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            path={urls.HOME}
            component={HomePage}
            layout={MainLayout}
            exact
          />
          <PublicRoute
            path={urls.LOGIN}
            component={LoginPage}
            layout={EmptyLayout}
          />
          <PublicRoute
            path={urls.REGISTER}
            component={RegisterPage}
            layout={EmptyLayout}
          />
          <PublicRoute
            path={`${urls.PRODUCTS}/:id?`}
            component={ProductPage}
            layout={MainLayout}
          />
          <PrivateRoute
            path={urls.MY_CART}
            component={MyCartPage}
            layout={MainLayout}
          />
          <PrivateRoute
            path={urls.FAVORITES}
            component={FavoritesPage}
            layout={MainLayout}
          />
          <PrivateRoute
            path={urls.MY_ORDERS}
            component={MyOrdersPage}
            layout={MainLayout}
          />
          <PrivateRoute
            path={urls.MY_ACCOUNT}
            component={MyAccountPage}
            layout={MainLayout}
          />
          <PublicRoute
            path={`${urls.STORES}/:id?`}
            component={StorePage}
            layout={MainLayout}
          />
          <PublicRoute
            path={urls.ABOUT}
            component={AboutPage}
            layout={MainLayout}
          />
          <PublicRoute
            path={urls.NOT_FOUND}
            component={Error404}
            layout={MainLayout}
          />
          <PublicRoute path="*" component={Error404} layout={MainLayout} />
        </Switch>
      </Router>

      <LevelUpModal
        title="Ανεβήκατε level!"
        onOpen={() => setLevelUpModalOpen(true)}
        onClose={() => setLevelUpModalOpen(false)}
        onConfirm={() => {}}
        open={levelUpModalOpen}
        confirmMessage="Ok"
        newLevel={calculateUserLevel(userReducer.user.xp)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser.call(id)),
    userCleanup: () => dispatch(userCleanup())
  };
};

Root.propTypes = {
  getUser: PropTypes.func,
  authReducer: PropTypes.object,
  userReducer: PropTypes.object,
  userCleanup: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
