import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';
// import styles from '../assets/styles/_variables.scss';

// Components
import Loading from '../components/Loading';
import ProductOptions from '../components/Products/ProductOptions';

import { Select } from 'semantic-ui-react';

// Redux Actions
import { fetchProducts } from '../redux/Products/products.actions';

const ProductPage = (props) => {
  const { match, products, fetchProducts } = props;
  const productId = parseInt(match.params.id);

  const [product, setProduct] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (products.list.length) {
      setProduct(products.list.find((product) => product.id === productId));
    } else {
      fetchProducts(productId);
    }
  }, []);

  useEffect(() => {
    if (products.list.length) {
      setProduct(products.list.find((product) => product.id === productId));
      console.log(products.list.find((product) => product.id === productId));
    }

    if (products.error) {
      history.push(urls.NOT_FOUND);
    }
  }, [products.loading]);

  return (
    <>
      <Loading loading={products.loading} fullHeight />
      {product && !products.loading && (
        <Container className="pt-6">
          <Row>
            <Col xl={7}>
              <img src={product.image} className="product-image" />
            </Col>
            <Col xl={5}>
              <ProductOptions product={product} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (id) => dispatch(fetchProducts(id))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
