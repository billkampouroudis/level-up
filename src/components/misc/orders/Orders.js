import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import is from '../../../utils/misc/is';
import get from '../../../utils/misc/get';

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
            <h3>{order.orderItems[0].product.store.brandName}</h3>
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
                  <div className="mt-2 mt-md-0 text-center text-md-left">
                    <Counter
                      initialCount={orderItem.quantity}
                      onChange={(newCount) =>
                        changeOrderItemCount(orderItem.id, index, newCount)
                      }
                    />
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  };

  /**
   * Calculates the cost before and after discount.
   *
   * @returns {object} Object with strings values of the original cost, the reduced cost and the total discount.
   */
  const calculateCosts = () => {
    let originalCost = 0;
    let reducedCost = 0;
    let totalDiscount = 0;
    for (let order of orders) {
      for (let orderItem of order.orderItems) {
        const original =
          parseFloat(get.safe(() => orderItem.product.originalPrice)) *
          orderItem.quantity;
        const reduced =
          parseFloat(get.safe(() => orderItem.product.reducedPrice)) *
          orderItem.quantity;

        originalCost += is.number(original) ? original : 0;
        reducedCost += is.number(reduced) ? reduced : 0;
      }
    }

    totalDiscount = reducedCost ? (originalCost - reducedCost).toFixed(2) : 0;
    originalCost = originalCost.toFixed(2);
    reducedCost = reducedCost ? reducedCost.toFixed(2) : originalCost;

    const costs = { originalCost, reducedCost, totalDiscount };
    props.costs && props.costs(costs);
    return costs;
  };

  useEffect(() => {
    const listOrders = () => {
      const options = {
        filters: [`status=${props.status}`]
      };

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
    calculateCosts();
    props.getOrders(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  return !loading ? renderOrders() : <Loader active inline="centered" />;
};

OrderItem.defaultProps = {
  status: 'in_cart'
};

OrderItem.propTypes = {
  status: PropTypes.oneOf(['in_cart']),
  costs: PropTypes.func,
  getOrders: PropTypes.func
};

export default OrderItem;
