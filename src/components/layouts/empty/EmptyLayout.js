import React from 'react';
import PropTypes from 'prop-types';

const EmptyLayout = (props) => {
  const { children } = props;

  return <main className="m-0">{children}</main>;
};

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default EmptyLayout;
