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
        <Link to={Urls.MY_CART}>
          <ShoppingCart32 />
          <h4>Καλάθι</h4>
        </Link>
      </li>
      <li>
        <Link to={Urls.FAVORITES}>
          <Favorite32 />
          <h4>Αγαπημένα πρϊόντα</h4>
        </Link>
      </li>
      <li>
        <Link to={Urls.MY_ORDERS}>
          <RecentlyViewed32 />
          <h4>Παραγγελίες</h4>
        </Link>
      </li>
      <li>
        <Link to={Urls.MY_LEVEL}>
          <Unlocked32 />
          <h4>Level</h4>
        </Link>
      </li>
      <li>
        <Link to={Urls.MY_ACCOUNT}>
          <User32 />
          <h4>Λογαριασμός</h4>
        </Link>
      </li>
      <li>
        <Logout32 />
        <h4>Αποσύνδεση</h4>
      </li>
    </ul>
  );
};

export default UserMenuLinks;
