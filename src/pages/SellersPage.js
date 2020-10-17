import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const SellersPage = (props) => {
  const { match } = props;

  return (
    <Container className="pt-6">
      <header className="App-header">
        <h1>{match.params.id ? `Seller ${match.params.id}` : 'Sellers'}</h1>
      </header>
    </Container>
  );
};

SellersPage.propTypes = {
  match: PropTypes.object
};

export default SellersPage;
