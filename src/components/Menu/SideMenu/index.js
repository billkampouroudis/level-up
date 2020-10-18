import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';
import './style.scss';
import { ChevronRight32, ChevronLeft32 } from '@carbon/icons-react';

// Components
import UserMenu from '../../misc/UserMenuLinks';

// Images
import logoWhite from '../../../assets/images/Logo-Small-White.svg';
import logoLargeWhite from '../../../assets/images/Logo-Large-White.svg';

const SideMenu = (props) => {
  const [sideNavState, setSideNavState] = useState(1); // 0:hidden, 1:default, 2:open
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
          {sideNavState === 2 ? (
            <img src={logoLargeWhite} alt="Logo" className="logo-full" />
          ) : (
            <img src={logoWhite} alt="Logo" className="logo" />
          )}
        </Link>
      </figure>
      {showSideNavControl()}
      <UserMenu />
    </aside>
  );
};

export default SideMenu;
