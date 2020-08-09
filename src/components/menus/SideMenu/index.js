import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';

import './style.scss';

import { Container } from 'react-bootstrap';
import {
  FaceWink32,
  ChevronRight32,
  ChevronLeft32,
  ShoppingCart32,
  Favorite32,
  RecentlyViewed32,
  Unlocked32,
  User32
} from '@carbon/icons-react';

const SideMenu = (props) => {
  const [sideNavState, setSideNavState] = useState(1); // 0:hidden, 1:default, 2:open
  const [pathName, setPathName] = useState(null);
  let location = useLocation();

  const open = () => {
    setSideNavState(2);
    document.getElementsByClassName('sidenav')[0].classList.add('open');

    const main = document.getElementsByTagName('main')[0];
    main.classList.add('side-menu-open');

    const child = document.createElement('div');
    child.setAttribute('id', 'hide-content-background');
    child.style.position = 'absolute';
    child.style.left = '0';
    child.style.top = '0';
    child.style.width = '100%';
    child.style.height = '100%';
    child.style.background = '#000';
    child.style.opacity = '40%';

    child.addEventListener('click', close);

    main.appendChild(child);
  };

  const close = () => {
    setSideNavState(1);
    document.getElementsByClassName('sidenav')[0].classList.remove('open');

    const main = document.getElementsByTagName('main')[0];
    main.classList.remove('side-menu-open');

    const hideContentBackground = document.getElementById(
      'hide-content-background'
    );

    if (hideContentBackground) {
      main.removeChild(hideContentBackground);
    }
  };

  const showSideNavControl = () => {
    if (sideNavState === 1) {
      return (
        <div className="control" onClick={open}>
          <ChevronRight32 />
        </div>
      );
    } else if (sideNavState === 2) {
      return (
        <div className="control" onClick={close}>
          <ChevronLeft32 />
        </div>
      );
    }
  };

  useEffect(() => {
    close();
  }, [location]);

  return (
    <aside className="sidenav bg-primary-dark">
      <figure className="w-100 text-center">
        <Link to={Urls.HOME}>
          <FaceWink32 className="logo" />
        </Link>
      </figure>
      {showSideNavControl()}
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
          <User32 />
          <h4>Λογαριασμός</h4>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
