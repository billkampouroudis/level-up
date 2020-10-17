import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const ProductsPage = (props) => {
  const { match } = props;

  return (
    <Container className="pt-6">
      <header className="App-header">
        <h1>{match.params.id ? `Product ${match.params.id}` : 'Products'}</h1>
      </header>
    </Container>
  );
};

ProductsPage.propTypes = {
  match: PropTypes.object
};

export default ProductsPage;
