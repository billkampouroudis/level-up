import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';

// Images
import TesImage from '../assets/images/product1.jpg';

// Redux Actions
import { fetchProducts } from '../redux/Products/products.actions';

const ProductsPage = (props) => {
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
            <Col xl={1} className="bg-primary">
              {product.id}
            </Col>
            <Col xl={5}>
              <img src={product.image} className="product-image" />
            </Col>
            <Col xl={6}>
              <Row>
                <Col>
                  <Link to={urls.SELLERS + product.seller.id}>
                    {product.seller.name}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>{product.name}</Col>
              </Row>
              <Row>
                <Col>{product.name}</Col>
              </Row>
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

ProductsPage.propTypes = {
  match: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
