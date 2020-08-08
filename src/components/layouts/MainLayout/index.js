import React from 'react';
import { Container } from 'react-bootstrap';

import SideMenu from '../../menus/SideMenu';

const MainLayout = (props) => {
  return (
    <Container>
      <SideMenu />
      <main>{props.children}</main>
    </Container>
  );
};

export default MainLayout;
