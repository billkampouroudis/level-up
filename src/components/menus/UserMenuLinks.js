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
  Unlocked32,
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
        <li>
          <h4>
            <Link to={urls.MY_CART}>
              <ShoppingCart32 />
              <span>Καλάθι</span>
            </Link>
          </h4>
        </li>
      )}
      {loggedIn && (
        <li>
          <h4>
            <Link to={urls.FAVORITES}>
              <Favorite32 />
              <span>Αγαπημένα πρϊόντα</span>
            </Link>
          </h4>
        </li>
      )}
      {loggedIn && (
        <li>
          <h4>
            <Link to={urls.MY_ORDERS}>
              <RecentlyViewed32 />
              <span>Παραγγελίες</span>
            </Link>
          </h4>
        </li>
      )}
      {loggedIn && (
        <li>
          <h4>
            <Link to={urls.MY_LEVEL}>
              <Unlocked32 />
              <span>Level</span>
            </Link>
          </h4>
        </li>
      )}
      <li>
        <h4>
          <Link to={loggedIn ? urls.MY_ACCOUNT : urls.LOGIN}>
            <User32 />
            <span>{loggedIn ? 'Λογαριασμός' : 'Σύνδεση'}</span>
          </Link>
        </h4>
      </li>
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
