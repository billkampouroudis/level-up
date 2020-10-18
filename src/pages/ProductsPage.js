import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';

// Redux Actions
import { fetchProducts } from '../redux/Products/products.actions';

const ProductsPage = (props) => {
  const { match, products, fetchProducts } = props;
  const productId = parseInt(match.params.id);

  const [product, setProduct] = useState({});

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
    }

    if (products.error) {
      history.push(urls.NOT_FOUND);
    }
  }, [products.loading]);

  return (
    <>
      <Loading loading={products.loading} fullHeight />
      {product && !products.loading ? (
        <Container className="pt-6">
          <Row>
            <Col xl={1} className="bg-primary">
              {product.id}
            </Col>
            <Col xl={5} className="bg-secondary">
              test
            </Col>
            <Col xl={6} className="bg-success">
              test
            </Col>
          </Row>
        </Container>
      ) : null}
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

ProductsPage.propTypes = {
  match: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
