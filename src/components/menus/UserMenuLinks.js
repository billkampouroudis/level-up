import React from 'react';
import { Link } from 'react-router-dom';
import Urls from '../../pages/router/Urls';

import {
  ShoppingCart32,
  Favorite32,
  RecentlyViewed32,
  Unlocked32,
  User32,
  Logout32
} from '@carbon/icons-react';

const UserMenuLinks = () => {
  return (
    <ul>
      <li>
        <h4>
          <Link to={Urls.MY_CART}>
            <ShoppingCart32 />
            <span>Καλάθι</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to={Urls.FAVORITES}>
            <Favorite32 />
            <span>Αγαπημένα πρϊόντα</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to={Urls.MY_ORDERS}>
            <RecentlyViewed32 />
            <span>Παραγγελίες</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to={Urls.MY_LEVEL}>
            <Unlocked32 />
            <span>Level</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Link to={Urls.MY_ACCOUNT}>
            <User32 />
            <span>Λογαριασμός</span>
          </Link>
        </h4>
      </li>
      <li>
        <h4>
          <Logout32 />
          <span>Αποσύνδεση</span>
        </h4>
      </li>
    </ul>
  );
};

export default UserMenuLinks;
