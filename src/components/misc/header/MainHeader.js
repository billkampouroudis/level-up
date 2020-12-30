import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const MainHeader = (props) => {
  return (
    <Container
      fluid
      className={`main-header d-flex align-items-center ${
        props.className ? props.className : ''
      }`}
      style={props.style || null}
    >
      <header>{props.children}</header>
    </Container>
  );
};

MainHeader.propTypes = {
  children: PropTypes.node,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default MainHeader;
