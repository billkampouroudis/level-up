import React from 'react';
import PropTypes from 'prop-types';

const Products = (props) => {
  const { children, className, onClick } = props;

  return (
    <button className={className || ''} onClick={onClick}>
      {children}
    </button>
  );
};

Products.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};
export default Products;
