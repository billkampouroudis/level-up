import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';
import { Select } from 'semantic-ui-react';
import styles from '../assets/styles/_variables.scss';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';

// Images
import TesImage from '../assets/images/product1.jpg';

// Redux Actions
import { fetchProducts } from '../redux/Products/products.actions';

const ProductPage = (props) => {
  const { match, products, fetchProducts } = props;
  const productId = parseInt(match.params.id);

  const [product, setProduct] = useState(null);

  const history = useHistory();

  const mapSizes = {
    XXS: 'XX-Small',
    XS: 'X-Small',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'X-Large',
    XXL: 'XX-Large',
    XXXL: 'XXX-Large',
    XXXXL: 'XXXX-Large'
  };

  const sizes = () => {
    if (product.sizes) {
      return product.sizes.map((size) => {
        return { key: size, value: size, text: mapSizes[size] || size };
      });
    }

    return [];
  };

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
            <Col xl={6}>
              <img src={product.image} className="product-image" />
            </Col>
            <Col xl={5}>
              <Row>
                <Col>
                  <Link to={urls.SELLERS + product.seller.id}>
                    {product.seller.name}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h1 className="h2 mb-4">{product.name}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="text-bold mb-1">Μέγεθος</label>
                  <Select placeholder="Επέλεξε μέγεθος" options={sizes()} />
                </Col>
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

ProductPage.propTypes = {
  match: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
