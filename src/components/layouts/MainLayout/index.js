import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../menus/Navbar';
import SideMenu from '../../menus/SideMenu';

const MainLayout = (props) => {
  const {children} = props;

  return (
    <>
      <Navbar />
      <SideMenu />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
