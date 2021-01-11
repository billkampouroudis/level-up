import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/Urls';

// Components
import RegisterForm from '../../forms/register/RegisterForm';

// Images
import logo from '../../../assets/images/Logo-Large.svg';

const Register = () => {
  return (
    <div className="register-container">
      <Row>
        <Col lg={5} className="register-image" />
        <Col className="d-flex align-items-center">
          <Container className="pt-5 px-sm-5 px-xl-10">
            <figure className="text-center mb-5">
              <img src={logo} alt="Logo" />
            </figure>
            <h1 className="h2 text-center">Δημιουργία λογαριασμού</h1>
            <p className="text-lg mb-4 text-center">
              <strong>Ανέβα level</strong> και ξεκλείδωσε{' '}
              <strong>ακόμα καλύτερες προσφορές</strong> σε όλα τα συνεργαζόμενα
              καταστήματα!
            </p>
            <RegisterForm />
            <div className="mb-3 text-center">
              <Link to={urls.LOGIN}>Έχω ήδη λογαριασμό</Link>
            </div>

            <div className="text-center">
              <Link to={urls.RESET_PASSWORD} className="text-grey-light">
                Ξέχασα τον κωδικό μου
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
