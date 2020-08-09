import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';
import './style.scss';

// import { Menu32 } from '@carbon/icons-react';

const CustomNav = () => (
  <Navbar bg="light" expand="lg" className="mobile-menu">
    Mobile
  </Navbar>
);

export default CustomNav;
