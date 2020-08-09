import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import Urls from '../../../pages/router/Urls';
import './style.scss';
import { Menu32 } from '@carbon/icons-react';

// Components
import MobileMenu from '../MobileMenu';

// Images
import logo from '../assets/images/logo.svg';

const CustomNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const categoriesConent = () => {
    return (
      <Row>
        <Col>
          <ul className="d-inline-block">
            <li>Μπλούζες</li>
            <li>Πουκάμισα</li>
            <li>Παντελόνια</li>
          </ul>
        </Col>
        <Col>
          <ul className="d-inline-block">
            <li>Φορέματα</li>
            <li>Μπουφάν</li>
            <li>Ζακέτες</li>
          </ul>
        </Col>
        <Col>
          <ul className="d-inline-block">
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
      default:
        return <span>No menu found</span>;
    }
  };

  const openMenuContent = (selectedItem) => {
    if (selectedItem === selectedMenuItem) {
      setSelectedMenuItem(null);
      return;
    }

    setSelectedMenuItem(selectedItem);

    document
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
            <img src={logo} alt="Logo" className="logo" />
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
