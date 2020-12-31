import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import is from '../../../utils/misc/is';
import get from '../../../utils/misc/get';
import { calculateCosts } from '../../../utils/orders/orders';

import { Item, Popup, Button, Loader } from 'semantic-ui-react';
import { TrashCan24 } from '@carbon/icons-react';

// Components
import Counter from '../counter/Counter';

// API
import ordersApi from '../../../api/orders';
import orderItemsApi from '../../../api/orderItems';

// Images
import EmptyCartIllustration from '../../../assets/images/undraw_empty_cart_co35.svg';

const OrderItem = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const renderOrders = () => {
    return orders.length ? (
      orders.map((order) =>
        get.safe(() => order.orderItems.length) ? (
          <div key={order.id} className="mb-5">
            <div className="mb-sm-2 d-sm-flex justify-content-between align-items-center">
              <h3 className="mb-0 mr-3">
                {order.orderItems[0].product.store.brandName}
              </h3>
              <div className="text-bold">
                {calculateCosts(order).reducedCost}€
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
    const listOrders = () => {
      let options = {};
      if (props.status.length) {
        options.filters = [`status=${props.status.join()}`];
      }

      setLoading(true);
      ordersApi.listOrders(options).then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
    };

    listOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.status]);

  useEffect(() => {
    const costs = calculateCosts();

    // Return values to parent component
    props.costs && props.costs(costs);
    props.getOrders && props.getOrders(orders);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  return !loading ? renderOrders() : <Loader active inline="centered" />;
};

OrderItem.defaultProps = {
  status: ['in_cart']
};

OrderItem.propTypes = {
  status: PropTypes.array,
  costs: PropTypes.func,
  getOrders: PropTypes.func
};

export default OrderItem;
