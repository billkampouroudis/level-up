import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../menus/navbar/Navbar';
import Sidebar from '../../menus/sidebar/Sidebar';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
