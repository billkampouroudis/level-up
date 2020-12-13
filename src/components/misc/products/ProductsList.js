import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Loader } from 'semantic-ui-react';

// Component
import ProductCard from './ProductCard';

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let _products = props.data || [];

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
          <Loader active inline="centered" />
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
