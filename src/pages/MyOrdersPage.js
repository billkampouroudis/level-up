import React from 'react';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import Orders from '../components/misc/orders/Orders';
import SEO from '../components/misc/seo/SEO';

const MyOrdersPage = () => {
  return (
    <>
      <SEO title="Οι παραγγελίες μου" />
      <Container className="pt-6">
        <Row>
          <Col>
            <header className="App-header">
              <h1>Οι παραγγελίες μου</h1>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <section>
              <Orders
                status={['registered', 'sent', 'closed']}
                emptyText="Δεν έχετε πραγματοποιήσει καμία παραγγελία"
              />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyOrdersPage;
