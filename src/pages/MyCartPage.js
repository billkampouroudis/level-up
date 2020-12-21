import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Image as ImageComponent, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import urls from '../pages/router/urls';

// API
import ordersApi from '../api/orders';

const MyCartPage = () => {
  const [orders, setOrders] = useState([]);

  const listOrders = () => {
    const options = {
      filters: ['status=in_cart']
    };

    ordersApi.listOrders(options).then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
  };

  const renderOrders = () => {
    return orders
      ? orders.map((order) => (
          <div key={order.id}>
            <h2>{order.orderItems[0].product.store.brandName}</h2>
            {renderOrderItems(order.orderItems)}
          </div>
        ))
      : null;
  };

  const renderOrderItems = (orderItems) => {
    return (
      <Item.Group>
        {orderItems.map((orderItem) => (
          <Item className="order-item" key={orderItem.id}>
            <Item.Image
              size="tiny"
              src={orderItem.product.image}
              alt={orderItem.product.name}
            />
            <Item.Content>
              <Item.Header>
                <Link
                  to={`${urls.PRODUCTS}/${orderItem.product.id}`}
                  className="text-grey-dark"
                >
                  {orderItem.product.name}
                </Link>
              </Item.Header>
              <Item.Description>
                <p>
                  Μέγεθος: <strong>{orderItem.size}</strong>
                </p>
                <p>
                  <strong>{orderItem.price}</strong>
                </p>
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
