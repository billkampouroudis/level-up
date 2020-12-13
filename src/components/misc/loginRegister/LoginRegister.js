import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import LoginForm from '../../Forms/login/LoginForm';

// Images
import logo from '../../../assets/images/Logo-Large.svg';

const LoginRegister = () => {
  return (
    <div className="login-register-container">
      <Row>
        <Col lg={5} className="login-register-image" />
        <Col className="d-flex align-items-center">
          <Container className="pt-5 px-sm-5 px-xl-10">
            <figure className="text-center mb-4">
              <img src={logo} alt="Logo" />
            </figure>
            <p className="text-lg mb-4">
              <strong>Ανέβα level</strong> και ξεκλείδωσε{' '}
              <strong>ακόμα καλύτερες προσφορές</strong> σε όλα τα συνεργαζόμενα
              καταστήματα!
            </p>
            <LoginForm />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default LoginRegister;
