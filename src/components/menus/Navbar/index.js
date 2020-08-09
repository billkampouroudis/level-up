import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';

import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './style.scss';

import { Menu32, FaceWink32 } from '@carbon/icons-react';

import MobileMenu from '../MobileMenu';

const CustomNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const categoriesConent = () => {
    return (
      <Row>
        <Col>
          <ul clasName="d-inline-block">
            <li>Μπλούζες</li>
            <li>Πουκάμισα</li>
            <li>Παντελόνια</li>
          </ul>
        </Col>
        <Col>
          <ul clasName="d-inline-block">
            <li>Φορέματα</li>
            <li>Μπουφάν</li>
            <li>Ζακέτες</li>
          </ul>
        </Col>
        <Col>
          <ul clasName="d-inline-block">
            <li>Φούστες</li>
            <li>Παπούτσια</li>
            <li>Εσώρουχα</li>
          </ul>
        </Col>
      </Row>
    );
  };

  const brandsContent = () => {
    return (
      <ul>
        <li>brands</li>
      </ul>
    );
  };

  const showMenuContent = () => {
    switch (selectedMenuItem) {
      case 'categories':
        return categoriesConent();
      case 'brands':
        return brandsContent();
    }
  };

  const openMenuContent = (selectedItem) => {
    if (selectedItem === selectedMenuItem) {
      setSelectedMenuItem(null);
      return;
    }

    setSelectedMenuItem(selectedItem);

    const main = document
      .getElementsByTagName('main')[0]
      .addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    setSelectedMenuItem(null);

    const main = document.getElementsByTagName('main')[0];
    main.removeEventListener('click', closeMenu);
  };

  return (
    <>
      <Navbar className="main-nav fixed-top">
        <Container>
          <Link to={Urls.HOME}>
            <FaceWink32 className="logo" />
          </Link>
          <Menu32
            className="mobile-control"
            onClick={() => {
              setMobileOpen(!mobileOpen);
            }}
          />
          <Nav className="main-nav-links mr-auto">
            <h4
              className={`nav-link cursor-pointer ${
                selectedMenuItem !== null && selectedMenuItem !== 'categories'
                  ? 'inactive-link'
                  : null
              }`}
              onClick={() => openMenuContent('categories')}
            >
              Κατηγορίες
            </h4>
            <h4
              className={`nav-link cursor-pointer ${
                selectedMenuItem !== null && selectedMenuItem !== 'brands'
                  ? 'inactive-link'
                  : null
              }`}
              onClick={() => openMenuContent('brands')}
            >
              Brands
            </h4>
          </Nav>
        </Container>
      </Navbar>

      <div className={`navbar-open ${selectedMenuItem ? 'd-block' : 'd-none'}`}>
        <Container>{showMenuContent()}</Container>
      </div>

      {mobileOpen ? <MobileMenu /> : null}
    </>
  );
};

export default CustomNav;
