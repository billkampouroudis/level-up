import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  increaseCounter,
  decreaseCounter
} from '../../redux/Counter/counter.actions';
import { fetchProducts } from '../../redux/Products/products.actions';

function Counter(props) {
  useEffect(() => {
    console.log(props.products.loading);
  }, [props.products.loading]);

  return (
    <div>
      <div>Count: {props.count}</div>
      <button onClick={() => props.increaseCounter()}>Increase Count</button>
      <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
      <button onClick={() => props.fetchProducts()}>Get products</button>
      <p>{props.products.error ? props.products.error : 'No error'}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
    fetchProducts: (url) =>
      dispatch(fetchProducts('https://fakestoreapi.com/products'))
  };
};

Counter.propTypes = {
  increaseCounter: PropTypes.func,
  decreaseCounter: PropTypes.func,
  fetchProducts: PropTypes.func,
  products: PropTypes.object,
  count: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
