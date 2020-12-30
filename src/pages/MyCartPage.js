import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import urls from './router/urls';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Message } from 'semantic-ui-react';
import Orders from '../components/misc/orders/Orders';
import SelectAddress from '../components/misc/selectAddress/SelectAddress';

// API
import ordersApi from '../api/orders';

// Redux Action
import { updateUser } from '../redux/user/user.actions';
import { propTypes } from 'react-bootstrap/esm/Image';

const MyCartPage = (props) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [costs, setCosts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [submitError, setSubmitError] = useState(false);

  let history = useHistory();

  const submitOrders = () => {
    const orderIds = [];
    for (let order of orders) {
      orderIds.push(order.id);
    }

    const data = {
      orderIds,
      addressId: selectedAddress.id,
      status: 'registered'
    };

    ordersApi
      .updateOrders(data)
      .then((res) => {
        props.updateUser(res.data);
        history.push(urls.HOME);
      })
      .catch(() => setSubmitError(true));
  };

  return (
    <>
      <Container className="pt-6">
        <header className="App-header">
          <h1>Το καλάθι μου</h1>
        </header>
        <Row>
          <Col lg={orders.length ? 7 : 12}>
            <section>
              <Orders getOrders={setOrders} status="in_cart" costs={setCosts} />
            </section>
          </Col>
          {orders.length ? (
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
                  <Button
                    className="custom primary"
                    onClick={submitOrders}
                    disabled={!selectedAddress}
                  >
                    Ολοκλήρωση παραγγελίας
                  </Button>
                </div>
              </section>
            </Col>
          ) : null}
        </Row>
      </Container>
      {submitError && (
        <Message
          negative
          content="Σφάλμα κατά την υποβολή της παραγγελίας."
          onDismiss={() => setSubmitError(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

MyCartPage.propTypes = {
  updateUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCartPage);
