import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';

// Redux Actions
import { fetchProducts } from '../../redux/Products/products.actions';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.data) {
      if (props.exclude) {
        // exclude the given ids from the displayed products
        setProducts(
          props.data.filter((item) => !props.exclude.includes(item.id))
        );
      } else {
        setProducts(props.data);
      }
    } else {
      props.fetchProducts();
    }

    if (props.loading !== 'undefined') {
      setLoading(props.loading);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading, props.data]);

  useEffect(() => {
    if (!props.data) {
      setProducts(props.productsReducer.data);
      setLoading(props.productsReducer.isFetchingProducts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Container className="p-0">
        {loading ? <Loading loading={true} /> : <Row>{renderProducts()}</Row>}
      </Container>
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
  loading: PropTypes.bool,
  exclude: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
