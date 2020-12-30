import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

// Components
import Orders from '../components/misc/orders/Orders';
import SelectAddress from '../components/misc/selectAddress/SelectAddress';

const MyCartPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [costs, setCosts] = useState(0);

  return (
    <Container className="pt-6">
      <header className="App-header">
        <h1>Το καλάθι μου</h1>
      </header>
      <Row>
        <Col lg={7}>
          <section>
            <Orders status="in_cart" costs={setCosts} />
          </section>
        </Col>
        <Col lg={5}>
          <section className="pb-0 pt-0 pt-lg-7 pb-4">
            <h2>Επιλογή διεύθυνσης</h2>
            <SelectAddress
              onValueChange={(address) => setSelectedAddress(address)}
            />
          </section>
          <section className="py-0">
            <h2>Σύνολο</h2>
            <table className="w-100 mb-4">
              <tbody>
                {costs.originalCost !== costs.reducedCost ? (
                  <tr>
                    <td>Αρχική τιμή:</td>
                    <td className="text-right">
                      <span className="text-lg text-bold">
                        {costs.originalCost}€
                      </span>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td>Τελική τιμή:</td>
                  <td className="text-right">
                    <span className="text-lg text-bold">
                      {costs.reducedCost}€
                    </span>
                  </td>
                </tr>
                {costs.totalDiscount ? (
                  <tr>
                    <td>Κέρδισες:</td>
                    <td className="text-right">
                      <span className="text-lg text-bold">
                        {costs.totalDiscount}€
                      </span>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <div className="text-right">
              <Button className="custom primary">Ολοκλήρωση παραγγελίας</Button>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default MyCartPage;
