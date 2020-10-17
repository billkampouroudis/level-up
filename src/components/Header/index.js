import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import './style.scss';

const Header = (props) => {
  const style = {
    backgroundImage: `url(${props.backgroundImage})`,
    height: '850px'
  };

  return (
    <Container
      fluid
      className="header bg-primary mb-5 d-flex align-items-center"
      style={style}
    >
      {props.children}
    </Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;
