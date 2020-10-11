import React from 'react';

import { Container } from 'react-bootstrap';
import './style.scss';

//Components
// import CategoriesMenuLinks from '../../misc/CategoriesMenuLinks';
import UserMenuLinks from '../../misc/UserMenuLinks';

const CustomNav = () => {
  return (
    <section className="mobile-menu pt-4">
      <Container>
        <nav>
          {/* <section className="mb-4">
            <h2>Κατηγορίες</h2>
            <CategoriesMenuLinks />
          </section> */}
          <section>
            <h2>Μενού</h2>
            <UserMenuLinks />
          </section>
        </nav>
      </Container>
    </section>
  );
};

export default CustomNav;
