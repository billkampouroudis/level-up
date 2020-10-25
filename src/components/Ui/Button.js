import React from 'react';
import PropTypes from 'prop-types';

const Products = (props) => {
  const { text, className, onClick } = props;

  return (
    <button className={className || ''} onClick={onClick}>
      {text}
    </button>
  );
};

Products.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
export default Products;
