import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const Header = (props) => {
  const { children, backgroundImage, home } = props;

  const style = {
    backgroundImage: `url(${backgroundImage})`
  };

  return (
    <Container
      fluid
      className={`header mb-5 d-flex align-items-center ${home ? 'home' : ''}`}
      style={style}
    >
      {children}
    </Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
  home: PropTypes.bool
};

export default Header;
