import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Loader } from 'semantic-ui-react';

// Component
import ProductCard from './ProductCard';

// Images
import NoDataIllustration from '../../../assets/images/undraw_No_data_re_kwbl.svg';

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

  const renderProducts = () => {
    return products.length > 0 ? (
      products.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-3">
          <ProductCard product={product} />
        </Col>
      ))
    ) : (
      <Col className="text-center">
        <figure>
          <img
            src={NoDataIllustration}
            alt="No data"
            style={{ width: '150px', margin: '0 auto' }}
          />
        </figure>
        <p>Δεν βρέθηκαν προϊόντα</p>
      </Col>
    );
  };

  return (
    <>
      <Container>
        {!props.loading ? (
          <Row>{renderProducts()}</Row>
        ) : (
          <Loader active inline="centered" />
        )}
      </Container>
    </>
  );
};

Products.propTypes = {
  data: PropTypes.array.isRequired,
  exclude: PropTypes.array,
  loading: PropTypes.bool
};
export default Products;
