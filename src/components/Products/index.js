import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import is from '../../utils/misc/is';

// Component
import ProductCard from './ProductCard';
import Loading from '../Loading';

// Redux Actions
import {
  listProducts,
  listStoreProducts,
  cleanup as productsReducerCleanup
} from '../../redux/Products/products.actions';
import {
  listSuggestionsByStore,
  cleanup as suggestionsReducerCleanup
} from '../../redux/Suggestions/suggestions.actions';

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  /**
   * Use suggestions = true and storeId to show suggestions from the given store.
   * Use storeId = true to show the products of the given store.
   * By default shows all products
   */
  useEffect(() => {
    if (props.suggestions && props.storeId) {
      props.listSuggestionsByStore(props.storeId);
    } else if (props.storeId) {
      props.listStoreProducts(props.storeId);
    } else {
      props.listProducts();
    }

    return function cleanup() {
      props.productsReducerCleanup();
      props.suggestionsReducerCleanup();
    };
  }, []);

  useEffect(() => {
    let _products = [];

    if (props.suggestions && props.storeId) {
      _products = props.suggestionsReducer.suggestions;
    } else if (props.storeId) {
      _products = props.productsReducer.products;
    } else {
      _products = props.productsReducer.products;
    }

    // exclude the given ids from the displayed products
    if (props.exclude) {
      _products = _products.filter((item) => !props.exclude.includes(item.id));
    }

    setProducts(_products);
  }, [
    props.productsReducer.isListingProducts,
    props.suggestionsReducer.isListingSuggestionsByStore
  ]);

  function renderProducts() {
    if (products.length > 0) {
      return products.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-3">
          <ProductCard product={product} />
        </Col>
      ));
    }
  }

  function isLoading() {
    return (
      props.productsReducer.isListingProducts ||
      props.productsReducer.isListingSuggestionsByStore
    );
  }

  return (
    <>
      <Container>
        {!isLoading() && products ? (
          <Row>{renderProducts()}</Row>
        ) : (
          <Loading loading={true} />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer,
    suggestionsReducer: state.suggestionsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listProducts: () => dispatch(listProducts.call()),
    listSuggestionsByStore: (id) => dispatch(listSuggestionsByStore.call(id)),
    listStoreProducts: (id) => dispatch(listStoreProducts.call(id)),
    productsReducerCleanup: () => dispatch(productsReducerCleanup()),
    suggestionsReducerCleanup: () => dispatch(suggestionsReducerCleanup())
  };
};

Products.propTypes = {
  productsReducer: PropTypes.object,
  suggestionsReducer: PropTypes.object,
  listProducts: PropTypes.func,
  listSuggestionsByStore: PropTypes.func,
  listStoreProducts: PropTypes.func,
  suggestions: PropTypes.bool,
  storeId: PropTypes.array,
  exclude: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
