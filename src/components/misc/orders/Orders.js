import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import { connect } from 'react-redux';

import { Item, Popup, Button, Loader } from 'semantic-ui-react';
import { TrashCan24 } from '@carbon/icons-react';

// Utils
import is from '../../../utils/misc/is';
import get from '../../../utils/misc/get';
import { calculateCosts } from '../../../utils/orders/orders';

// Components
import Counter from '../counter/Counter';

// API
import orderItemsApi from '../../../api/orderItems';

// Images
import EmptyCartIllustration from '../../../assets/images/undraw_empty_cart_co35.svg';

// Redux Action
import {
  listOrders,
  updateOrders,
  setOrders
} from '../../../redux/orders/orders.actions';

const OrderItem = (props) => {
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { ordersReducer, setOrders } = props;
  const { orders } = ordersReducer;

  /**
   * Changes the count of the given products in the cart
   *
   * @param {number} orderItemId
   * @param {number} orderItemIndex
   * @param {number} newCount
   */
  const changeOrderItemCount = (orderItemId, orderItemIndex, newCount) => {
    orderItemsApi
      .updateOrderItem(orderItemId, { quantity: newCount })
      .then((res) => {
        const orderIndex = findOrderIndex(orderItemId, orderItemIndex);
        if (!is.number(orderIndex)) {
          return;
        }

        const _orders = [...orders];
        _orders[orderIndex].orderItems[orderItemIndex] = res.data;

        setOrders(_orders);
      });
  };

  const removeOrderItem = (orderItemId, orderItemIndex) => {
    orderItemsApi.removeOrderItem(orderItemId).then(() => {
      const orderIndex = findOrderIndex(orderItemId, orderItemIndex);
      if (!is.number(orderIndex)) {
        return;
      }

      const _orders = [...orders];

      if (_orders[orderIndex].length === 0) {
        _orders.splice(orderIndex, 1);
      } else {
        _orders[orderIndex].orderItems.splice(orderItemIndex, 1);
      }

      setOrders(_orders);
    });
  };

  const findOrderIndex = (orderItemId, orderItemIndex) => {
    return orders.findIndex(
      (order) =>
        order.orderItems[orderItemIndex] &&
        order.orderItems[orderItemIndex].id === orderItemId
    );
  };

  const renderStatus = (order) => {
    switch (order.status) {
      case 'in_cart':
        return 'Στο καλάθι';
      case 'registered':
        return 'Καταχωρήθηκε';
      case 'sent':
        return 'Απεστάλλει';
      case 'done':
        return 'Ολοκληρώθηκε';
      default:
        return '';
    }
  };

  const renderOrders = () => {
    return orders.length ? (
      orders.map((order) =>
        get.safe(() => order.orderItems.length) ? (
          <div key={order.id} className="mb-5">
            <div className="mb-sm-2">
              <h3>{order.orderItems[0].product.store.brandName}</h3>
              <div>
                <p className="mb-0">
                  Κόστος:{' '}
                  <span className="text-bold">
                    {calculateCosts(order).reducedCost}€
                  </span>
                </p>
                {order.status !== 'in_cart' ? (
                  <p>
                    Κατάσταση:{' '}
                    <span className="text-bold">{renderStatus(order)}</span>
                  </p>
                ) : null}
              </div>
            </div>
            {renderOrderItems(order.orderItems)}
          </div>
        ) : null
      )
    ) : (
      <div className="text-center">
        <figure>
          <img
            src={EmptyCartIllustration}
            alt="No data"
            style={{ width: '150px', margin: '0 auto' }}
          />
        </figure>
        <p>Δεν υπάρχουν προϊόντα στο καλάθι</p>
      </div>
    );
  };

  const renderOrderItems = (orderItems) => {
    return (
      <Item.Group>
        {orderItems.map((orderItem, index) => (
          <Item className="order-item mb-3" key={orderItem.id}>
            <Item.Image
              size="tiny"
              src={orderItem.product.image}
              alt={orderItem.product.name}
            />
            <Item.Content>
              <Item.Header className="d-block">
                <div className="d-flex align-items-center justify-content-between">
                  <Link
                    to={`${urls.PRODUCTS}/${orderItem.product.id}`}
                    className="text-grey-dark mr-3"
                  >
                    {orderItem.product.name}
                  </Link>
                  {props.status.includes('in_cart') ? (
                    <span>
                      <Popup
                        wide
                        trigger={
                          <TrashCan24 className="text-danger cursor-pointer" />
                        }
                        on="click"
                      >
                        Θέλεις να διαγράψεις το προϊόν από το καλάθι σου;
                        <div className="text-right mt-3">
                          <Button
                            type="submit"
                            className="custom primary sm"
                            onClick={() => removeOrderItem(orderItem.id, index)}
                          >
                            Διαγραφή
                          </Button>
                        </div>
                      </Popup>
                    </span>
                  ) : null}
                </div>
              </Item.Header>
              <Item.Description>
                <div className="d-md-flex align-items-center justify-content-between">
                  <div>
                    <p>
                      Μέγεθος: <strong>{orderItem.size}</strong>
                    </p>
                    <p>
                      <strong>{orderItem.price}€</strong>
                    </p>
                  </div>
                  {props.status.includes('in_cart') ? (
                    <div className="mt-2 mt-md-0 text-center text-md-left">
                      <Counter
                        initialCount={orderItem.quantity}
                        onChange={(newCount) =>
                          changeOrderItemCount(orderItem.id, index, newCount)
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  };

  useEffect(() => {
    let options = {};
    if (props.status.length) {
      options.filters = [`status=${props.status.join()}`];
    }
    props.listOrders(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ordersReducer.isListingOrders) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [ordersReducer.isListingOrders]);

  return !loading ? renderOrders() : <Loader active inline="centered" />;
};

OrderItem.defaultProps = {
  status: []
};

const mapStateToProps = (state) => {
  return {
    ordersReducer: state.ordersReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listOrders: (options) => dispatch(listOrders.call(options)),
    updateOrders: (data, options) => dispatch(updateOrders.call(data, options)),
    setOrders: (orders) => dispatch(setOrders(orders))
  };
};

OrderItem.propTypes = {
  ordersReducer: PropTypes.object,
  listOrders: PropTypes.func,
  updateOrders: PropTypes.func,
  getOrders: PropTypes.func,
  status: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
