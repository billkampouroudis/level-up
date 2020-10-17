import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './style.scss';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';

// Redux Actions
import { fetchProducts } from '../../redux/Products/products.actions';
import { useEffect } from 'react';

const Products = (props) => {
  const { fetchProducts, products } = props;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderProducts = () => {
    if (props.products.list.length) {
      return props.products.list.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ));
    }
  };

  return (
    <Container>
      <Row>{renderProducts()}</Row>
      <Loading loading={products.loading} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () =>
      dispatch(fetchProducts('https://fakestoreapi.com/products'))
  };
};

Products.propTypes = {
  products: PropTypes.object,
  fetchProducts: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
