import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';
// import styles from '../assets/styles/_variables.scss';

// Components
import Loading from '../components/Loading';
import ProductOptions from '../components/Products/ProductOptions';

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

    if (products.error) {
      history.push(urls.NOT_FOUND);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.loading]);

  return (
    <>
      <Loading loading={products.loading} fullHeight />
      {product && !products.loading && (
        <Container className="pt-6">
          <Row>
            <Col md={6} xl={7}>
              <img
                src={product.image}
                className="product-image"
                alt={product.name}
              />
            </Col>
            <Col md={6} xl={5}>
              <ProductOptions productId={productId} />
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
