import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';
import ErrorAlert from '../Alerts/ErrorAlert';

// Redux Actions
import { fetchProducts } from '../../redux/Products/products.actions';

const Products = (props) => {
  const { fetchProducts, products } = props;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderProducts = () => {
    if (products.list.length) {
      return props.products.list.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ));
    }
  };

  return (
    <>
      <Container>
        {products.list.length <= 1 && products.loading ? (
          <Loading loading={products.loading} />
        ) : (
          <Row>{renderProducts()}</Row>
        )}
      </Container>
      {products.error && <ErrorAlert message={products.error} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

Products.propTypes = {
  products: PropTypes.object,
  fetchProducts: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
