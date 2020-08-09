import React from 'react';

import Navbar from '../../menus/Navbar';
import SideMenu from '../../menus/SideMenu';

const MainLayout = (props) => {
  return (
    <>
      <Navbar />
      <SideMenu />
      <main>
        <div>{props.children}</div>
      </main>
    </>
  );
};

export default MainLayout;
