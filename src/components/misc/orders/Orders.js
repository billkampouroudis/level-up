import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import { connect } from 'react-redux';
import moment from 'moment';

// Utils
import is from '../../../utils/misc/is';
import get from '../../../utils/misc/get';
import {
  calculateCosts,
  calculateRegisteredCost
} from '../../../utils/prices/prices';

// Components
import { Item, Popup, Button, Loader } from 'semantic-ui-react';
import { TrashCan24 } from '@carbon/icons-react';
import Counter from '../counter/Counter';
import ProductPrices from '../products/ProductPrices';

// API
import orderItemsApi from '../../../api/orderItems';

// Images
import EmptyCartIllustration from '../../../assets/images/undraw_empty_cart_co35.svg';

// Redux Action
import {
  listOrders,
  updateOrders,
  ordersCleanup,
  setOrders
} from '../../../redux/orders/orders.actions';

// Constants
import {
  ORDER_IN_CART,
  ORDER_REGISTERED,
  ORDER_SENT,
  ORDER_CLOSED
} from '../../../constants';

const Orders = React.memo((props) => {
  const [loading, setLoading] = useState(false);

  const { ordersReducer, setOrders, listOrders, ordersCleanup } = props;
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

      let _orders = [...orders];
      _orders[orderIndex].orderItems.splice(orderItemIndex, 1);

      if (_orders.length === 1 && _orders[orderIndex].orderItems.length === 0) {
        _orders = [];
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
      case ORDER_IN_CART:
        return 'Στο καλάθι';
      case ORDER_REGISTERED:
        return 'Καταχωρήθηκε';
      case ORDER_SENT:
        return 'Απεστάλλει';
      case ORDER_CLOSED:
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
                    {props.status.includes(ORDER_IN_CART)
                      ? calculateCosts(order).reducedCost
                      : calculateRegisteredCost(order)}
                    €
                  </span>
                </p>
                {order.status !== 'in_cart' ? (
                  <>
                    <p className="mb-0">
                      Κατάσταση:{' '}
                      <span className="text-bold">{renderStatus(order)}</span>
                    </p>
                    <p>
                      Ημερομηνία:{' '}
                      <span className="text-bold">
                        {moment(order.registeredAt).format('YYYY-MM-DD HH:mm')}
                      </span>
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            {renderOrderItems(order.orderItems, order.status)}
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
        <p>{props.emptyText}</p>
      </div>
    );
  };

  const renderRatingButton = (product) => {
    return (
      <Button className="custom secondary sm mt-3">
        Αξιολογίστε το προϊόν
      </Button>
    );
  };

  const renderOrderItems = (orderItems, orderStatus) => {
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
                  {props.status.includes(ORDER_IN_CART) ? (
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
                    {!props.status.includes(ORDER_IN_CART) ? (
                      <span className="text-semi-bold text-lg">
                        {orderItem.price}€
                      </span>
                    ) : (
                      <ProductPrices
                        product={orderItem.product}
                        quantity={orderItem.quantity}
                      />
                    )}
                    <div className="text-center">
                      {orderStatus === ORDER_CLOSED
                        ? renderRatingButton()
                        : null}
                    </div>
                  </div>
                  {props.status.includes(ORDER_IN_CART) ? (
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
    if (ordersReducer.isListingOrders) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [ordersReducer.isListingOrders]);

  useEffect(() => {
    let options = {};
    if (props.status.length) {
      options.filters = [`status=${props.status.join()}`];
    }
    listOrders(options);

    return () => {
      ordersCleanup();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? renderOrders() : <Loader active inline="centered" />;
});

Orders.defaultProps = {
  status: [],
  emptyText: 'Δεν υπάρχουν προϊόντα στο καλάθι'
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
    ordersCleanup: (orders) => dispatch(ordersCleanup(orders)),
    setOrders: (orders) => dispatch(setOrders(orders))
  };
};

Orders.propTypes = {
  ordersReducer: PropTypes.object,
  listOrders: PropTypes.func,
  updateOrders: PropTypes.func,
  getOrders: PropTypes.func,
  status: PropTypes.array,
  ordersCleanup: PropTypes.func,
  setOrders: PropTypes.func,
  emptyText: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
