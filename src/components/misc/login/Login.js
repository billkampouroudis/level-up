import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Urls from '../../../pages/router/Urls';

// Components
import LoginForm from '../../forms/login/LoginForm';

// Images
import logo from '../../../assets/images/Logo-Large.svg';

const LoginRegister = () => {
  return (
    <div className="login-container">
      <Row>
        <Col lg={5} className="login-image" />
        <Col className="d-flex align-items-center">
          <Container className="pt-5 px-sm-5 px-xl-10">
            <figure className="text-center mb-5">
              <img src={logo} alt="Logo" />
            </figure>
            <h1 className="h2 text-center">Σύνδεση</h1>
            <p className="text-lg mb-4 text-center">
              Ανέβασε <strong>level</strong> στις αγορές σου!
            </p>
            <LoginForm />
            <div className="mb-3 text-center">
              <Link to={Urls.REGISTER}>Δημιουργία λογαριασμού</Link>
            </div>

            <div className="text-center">
              <Link to={Urls.RESET_PASSWORD} className="text-grey-light">
                Ξέχασα τον κωδικό μου
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default LoginRegister;
