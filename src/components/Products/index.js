import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let _products = props.data || [];
    console.log(_products);

    if (props.exclude) {
      _products = _products.filter((item) => !props.exclude.includes(item.id));
    }
    setProducts(_products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <>
      <Container>
        {products.length > 0 ? (
          <Row>
            {products.map((product) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                className="mb-3"
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

Products.propTypes = {
  data: PropTypes.array.isRequired,
  exclude: PropTypes.array
};
export default Products;
