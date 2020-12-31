import React, { useState } from 'react';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import Orders from '../components/misc/orders/Orders';

const MyOrdersPage = () => {
  // const [orders, setOrders] = useState([]);
  let orders = [];

  return (
    <Container className="pt-6">
      <Row>
        <Col>
          <header className="App-header">
            <h1>My Orders</h1>
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <Orders
              getOrders={(newOrders) => {
                orders = newOrders;
              }}
              status={['registered', 'sent', 'closed']}
            />
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default MyOrdersPage;
