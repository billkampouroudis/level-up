import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Item, Popup, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import urls from '../pages/router/urls';
import { TrashCan24 } from '@carbon/icons-react';
import is from '../utils/misc/is';

// Components
import Counter from '../components/misc/counter/Counter';

// API
import ordersApi from '../api/orders';
import orderItemsApi from '../api/orderItems';

const MyCartPage = () => {
  const [orders, setOrders] = useState([]);

  const listOrders = () => {
    const options = {
      filters: ['status=in_cart']
    };

    ordersApi.listOrders(options).then((res) => {
      setOrders(res.data);
    });
  };

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
    return orders
      ? orders.map((order) => {
          return order.orderItems.length ? (
            <div key={order.id} className="mb-5">
              <h2>{order.orderItems[0].product.store.brandName}</h2>
              {renderOrderItems(order.orderItems)}
            </div>
          ) : null;
        })
      : null;
  };

  const renderOrderItems = (orderItems) => {
    return (
      <Item.Group>
        {orderItems.map((orderItem, index) => (
          <Item className="order-item my-3" key={orderItem.id}>
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
              {/* {orderItem.quantity} <br />
               <br />
              {orderItem.price} */}
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  };

  useEffect(() => {
    listOrders();
  }, []);

  return (
    <Container className="pt-6">
      <header className="App-header">
        <h1>My Cart</h1>
      </header>

      <section>{renderOrders()}</section>
    </Container>
  );
};

export default MyCartPage;
