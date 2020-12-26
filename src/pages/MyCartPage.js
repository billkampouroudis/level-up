import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import Orders from '../components/misc/orders/Orders';
import SelectAddress from '../components/misc/selectAddress/SelectAddress';

const MyCartPage = () => {
  return (
    <Container className="pt-6">
      <Row>
        <Col md={7}>
          <header className="App-header">
            <h1>Το καλάθι μου</h1>
          </header>
          <section>
            <Orders status="in_cart" />
          </section>
        </Col>
        <Col md={5}>
          <section className="pt-0">
            <h3>Επιλογή διεύθυνσης</h3>
            <SelectAddress />
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default MyCartPage;
