import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import urls from './router/urls';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { calculateCosts } from '../utils/prices/prices';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Message } from 'semantic-ui-react';
import SEO from '../components/misc/seo/SEO';
import Orders from '../components/misc/orders/Orders';
import SelectAddress from '../components/misc/selectAddress/SelectAddress';
import LevelUpModal from '../components/modals/level/LevelUpModal';

// API
import ordersApi from '../api/orders';

// Redux Action
import { setUser } from '../redux/user/user.actions';
import { updateOrders } from '../redux/orders/orders.actions';
import { calculateUserLevel } from '../utils/levels/levels';

const MyCartPage = (props) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [costs, setCosts] = useState(0);
  const [submitError, setSubmitError] = useState(false);
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);

  const { orders } = props.ordersReducer;
  const { user } = props.userReducer;

  let history = useHistory();

  const submitOrders = () => {
    const { orders } = props.ordersReducer;
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
        const newUser = res.data;

        if (calculateUserLevel(newUser.xp) > calculateUserLevel(user.xp)) {
          props.setUser(newUser);
          setLevelUpModalOpen(true);
        } else {
          props.setUser(newUser);
          history.push(urls.HOME);
        }
      })
      .catch(() => setSubmitError(true));
  };

  useEffect(() => {
    setCosts(calculateCosts(orders));
  }, [orders]);

  useEffect(() => {
    return () => {};
  });

  return (
    <>
      <SEO title="Το καλάθι μου" />
      <Container className="pt-6">
        <header className="App-header">
          <h1>Το καλάθι μου</h1>
        </header>
        <Row>
          <Col lg={orders.length ? 7 : 12}>
            <section>
              <Orders status={['in_cart']} />
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
                <h2>Σύνοψη</h2>
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
                        <td>Κερδίζετε:</td>
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
      <LevelUpModal
        title="Ανεβήκατε level!"
        onOpen={() => setLevelUpModalOpen(true)}
        onClose={() => {
          setLevelUpModalOpen(false);
        }}
        onConfirm={() => {
          history.push(urls.HOME);
        }}
        open={levelUpModalOpen}
        confirmMessage="Επιστροφή στην αρχική"
        newLevel={calculateUserLevel(user.xp)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ordersReducer: state.ordersReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    updateOrders: (data, options) => dispatch(updateOrders.call(data, options))
  };
};

MyCartPage.propTypes = {
  ordersReducer: PropTypes.object,
  userReducer: PropTypes.object,
  setUser: PropTypes.func,
  updateOrders: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCartPage);
