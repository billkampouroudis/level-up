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
  children: PropTypes.node,
  backgroundImage: PropTypes.string,
  home: PropTypes.bool,
  store: PropTypes.bool,
  className: PropTypes.string
};

export default Header;
