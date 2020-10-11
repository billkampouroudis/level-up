import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../Menu/Navbar';
import SideMenu from '../../Menu/SideMenu';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      <SideMenu />
      <main>{children}</main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
