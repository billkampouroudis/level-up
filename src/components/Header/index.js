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
      className={`header mb-5 d-flex align-items-center ${
        props.home ? 'home' : ''
      } ${props.seller ? 'seller' : ''}`}
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
  seller: PropTypes.bool
};

export default Header;
