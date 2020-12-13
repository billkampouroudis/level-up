import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Urls from '../../../pages/router/Urls';
import { Menu32 } from '@carbon/icons-react';

// Components
import MobileMenu from '../mobile/MobileMenu';
import CategoriesMenuLinks from '../CategoriesMenuLinks';

// Images
import logo from '../../../assets/images/Logo-Small.svg';

const CustomNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  let location = useLocation();

  const showMenuContent = () => {
    switch (selectedMenuItem) {
      case 'categories':
        return <CategoriesMenuLinks />;
      case 'brands':
        return <span>Brands</span>;
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
    //  Close desktop menu
    setSelectedMenuItem(null);
    const main = document.getElementsByTagName('main')[0];
    main.removeEventListener('click', closeMenu);

    //  Close mobile menu
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Navbar className="main-nav fixed-top d-flex d-md-none">
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
            <h3
              className={`nav-link cursor-pointer ${
                selectedMenuItem !== null && selectedMenuItem !== 'categories'
                  ? 'inactive-link'
                  : null
              }`}
              onClick={() => openMenuContent('categories')}
            >
              Κατηγορίες
            </h3>
            <h3
              className={`nav-link cursor-pointer ${
                selectedMenuItem !== null && selectedMenuItem !== 'brands'
                  ? 'inactive-link'
                  : null
              }`}
              onClick={() => openMenuContent('brands')}
            >
              Brands
            </h3>
          </Nav>
        </Container>
      </Navbar>

      {/* Desktop Menu Content*/}
      <div className={`navbar-open ${selectedMenuItem ? 'd-block' : 'd-none'}`}>
        <Container>{showMenuContent()}</Container>
      </div>

      {/* Mobile Menu Content*/}
      {mobileOpen ? <MobileMenu /> : null}
    </>
  );
};

export default CustomNav;
