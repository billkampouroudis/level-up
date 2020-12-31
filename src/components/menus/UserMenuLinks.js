import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import urls from '../../pages/router/urls';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

// Redux Actions
import { authCleanup } from '../../redux/auth/auth.actions';

import {
  ShoppingCart32,
  Favorite32,
  RecentlyViewed32,
  User32,
  Logout32
} from '@carbon/icons-react';

const UserMenuLinks = (props) => {
  const { authReducer } = props;

  const [loggedIn, setLoggedIn] = useState(!!authReducer.token);

  useEffect(() => {
    setLoggedIn(!!authReducer.token);
  }, [authReducer.token]);

  const logout = () => {
    props.authCleanup();
  };

  return (
    <ul>
      {loggedIn && (
        <Link to={urls.MY_CART}>
          <li>
            <h4>
              <ShoppingCart32 />
              <span>Καλάθι</span>
            </h4>
          </li>
        </Link>
      )}
      {loggedIn && (
        <Link to={urls.FAVORITES}>
          <li>
            <h4>
              <Favorite32 />
              <span>Αγαπημένα πρϊόντα</span>
            </h4>
          </li>
        </Link>
      )}
      {loggedIn && (
        <Link to={urls.MY_ORDERS}>
          <li>
            <h4>
              <RecentlyViewed32 />
              <span>Παραγγελίες</span>
            </h4>
          </li>
        </Link>
      )}
      <Link to={loggedIn ? urls.MY_ACCOUNT : urls.LOGIN}>
        <li>
          <h4>
            <User32 />
            <span>{loggedIn ? 'Λογαριασμός' : 'Σύνδεση'}</span>
          </h4>
        </li>
      </Link>

      {loggedIn && (
        <li>
          <Popup
            trigger={
              <h4 onClick={logout}>
                <Logout32 />
                <span>Αποσύνδεση</span>
              </h4>
            }
            content="Αποσύνδεση"
            position="top right"
          />
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCleanup: () => dispatch(authCleanup())
  };
};

UserMenuLinks.propTypes = {
  authReducer: PropTypes.object,
  authCleanup: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuLinks);
