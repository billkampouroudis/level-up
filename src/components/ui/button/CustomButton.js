import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  return <button {...props}>{props.children}</button>;
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired
};
export default CustomButton;
