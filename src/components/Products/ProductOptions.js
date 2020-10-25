import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from '../../pages/router/Urls';
import { Select } from 'semantic-ui-react';
import { Locked32, Favorite32, FavoriteFilled32 } from '@carbon/icons-react';

// Component
import Counter from '../misc/Counter';
import Button from '../Ui/Button';
import ErrorAlert from '../Alerts/ErrorAlert';

// Redux Actions
import { addToFavorites } from '../../redux/Products/products.actions';

const ProductOptions = (props) => {
  const { productId, products, addToFavorites } = props;

  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);

  const user = null;

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

  const handleFavorites = () => {
    setIsFavorite(!isFavorite);
    addToFavorites(product.id);
  };

  useEffect(() => {
    setProduct(products.list.find((product) => product.id === productId));
  }, [products]);

  useEffect(() => {
    if (product) {
      setIsFavorite(product.isFavorite);
    }
  }, [product]);

  return (
    product && (
      <>
        <Container fluid className="product-options p-0 mt-4 mt-lg-0">
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
          <Row>
            <Col>
              <label className="text-bold mb-1">Ποσότητα</label>
              <Counter />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label className="text-bold mb-1 d-block">Τιμή</label>
              <div className="d-flex align-items-center">
                <span
                  className={`original-price  align-items-center mr-2 ${
                    user ? 'delete' : ''
                  }`}
                >
                  35.00$
                </span>

                <Locked32 />
                <span
                  className={`discount-price align-items-center ${
                    user ? 'text-primary' : 'text-danger'
                  }`}
                >
                  25.00$
                </span>
              </div>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col>
              <Button text="Add to cart" className="custom primary mr-3" />

              {isFavorite ? (
                <FavoriteFilled32
                  className="cursor-pointer text-primary"
                  onClick={handleFavorites}
                />
              ) : (
                <Favorite32
                  className="cursor-pointer text-primary"
                  onClick={handleFavorites}
                />
              )}
            </Col>
          </Row>
        </Container>
        {products.error && <ErrorAlert message={products.error} />}
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: (id) => dispatch(addToFavorites(id))
  };
};

ProductOptions.propTypes = {
  productId: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions);
