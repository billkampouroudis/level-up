import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Components
import ProductsList from '../components/misc/products/ProductsList';
import SEO from '../components/misc/seo/SEO';

// API
import favoritesApi from '../api/favorites';

const FavoritesPage = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    favoritesApi.listFavorites().then((res) => {
      setFavorites(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <SEO title="Αγαπημένα προϊόντα" />
      <Container className="pt-6">
        <header className="App-header">
          <h1>Αγαπημένα προϊόντα</h1>
        </header>
        <section>
          <ProductsList data={favorites} loading={loading} />
        </section>
      </Container>
    </>
  );
};

FavoritesPage.propTypes = {
  productsReducer: PropTypes.object
};

export default FavoritesPage;
