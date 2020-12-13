import React from 'react';

import { Container } from 'react-bootstrap';

//Components
// import CategoriesMenuLinks from '../../misc/CategoriesMenuLinks';
import UserMenuLinks from '../UserMenuLinks';

const CustomNav = () => {
  return (
    <section className="mobile-menu pt-4">
      <Container>
        <nav>
          {/* <section className="mb-4">
            <h2>Κατηγορίες</h2>
            <CategoriesMenuLinks />
          </section> */}
          <section className="text-center">
            <div className="d-inline-block">
              <h2 className="text-left">Μενού</h2>
              <UserMenuLinks />
            </div>
          </section>
        </nav>
      </Container>
    </section>
  );
};

export default CustomNav;
