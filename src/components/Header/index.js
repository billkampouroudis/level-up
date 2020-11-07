import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const Header = (props) => {
  const style = {
    backgroundImage: `url(${props.backgroundImage})`
  };

  return (
    <Container
      fluid
      className={`header d-flex align-items-center ${
        props.className ? props.className : ''
      }`}
      style={style}
    >
      {props.children}
    </Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
  home: PropTypes.bool,
  seller: PropTypes.bool,
  className: PropTypes.string
};

export default Header;
