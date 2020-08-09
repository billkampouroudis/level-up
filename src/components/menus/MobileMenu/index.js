import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';

import { Container } from 'react-bootstrap';
import './style.scss';

//Components
import CategoriesMenuLinks from '../../misc/CategoriesMenuLinks';
import UserMenuLinks from '../../misc/UserMenuLinks';

const CustomNav = () => (
  <section className="mobile-menu pt-4">
    <Container>
      <nav>
        <ul className="mb-5">
          <li>
            <h2>Κατηγορίες</h2>
            <CategoriesMenuLinks />
          </li>
        </ul>
        <UserMenuLinks />
      </nav>
    </Container>
  </section>
);

export default CustomNav;
