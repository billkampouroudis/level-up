import React, { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.data) {
      setProducts(props.data);
    } else {
      props.fetchProducts();
    }

    if (props.loading !== 'undefined') {
      setLoading(props.loading);
    }
  }, [props.loading, props.data]);

  useEffect(() => {
    if (!props.data) {
      setProducts(props.productsReducer.data);
      setLoading(props.productsReducer.isFetchingProducts);
    }
  }, [props.productsReducer]);

  const renderProducts = () => {
    if (products.length) {
      return products.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ));
    }
  };

  return (
    <>
      <Container>
        {products && products.length <= 1 && loading ? (
          <Loading loading={true} />
        ) : (
          <Row>{renderProducts()}</Row>
        )}
      </Container>
      {/* {props.productsReducer.isFetchingProductsError && (
        <ErrorAlert message={props.productsReducer.isFetchingProductsError} />
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

Products.propTypes = {
  productsReducer: PropTypes.object,
  fetchProducts: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
