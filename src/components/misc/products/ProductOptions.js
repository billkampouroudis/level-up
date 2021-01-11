import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from '../../../pages/router/urls';
import { useHistory } from 'react-router-dom';

// Utils
import { validateOne } from '../../../utils/validation/index';

// Component
import { Favorite32, FavoriteFilled32 } from '@carbon/icons-react';
import Counter from '../counter/Counter';
import { Message, Button } from 'semantic-ui-react';
import CustomSelect from '../../formElements/select/CustomSelect';
import ProductPrices from './ProductPrices';

// Redux Actions
import {
  addToFavorites,
  removeFromFavorites
} from '../../../redux/products/products.actions';

// API
import favoritesApi from '../../../api/favorites';
import orderItemsApi from '../../../api/orderItems';

const ProductOptions = (props) => {
  let history = useHistory();

  const [sizeSelect, setSizeSelect] = useState({
    value: null,
    label: 'Μέγεθος',
    rules: {
      notEmpty: true
    },
    errorMessage: ''
  });
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [showAddToCartError, setShowAddToCartError] = useState(false);

  const { product } = props.productsReducer;

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

  const handleFavorites = () => {
    if (!props.authReducer.token) {
      history.push(urls.LOGIN);
      return;
    }

    if (product.isFavorite) {
      favoritesApi
        .removeFromFavorites(product.id)
        .then(() => {
          props.removeFromFavorites();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      favoritesApi
        .addToFavorites(product.id)
        .then(() => {
          props.addToFavorites();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const addToCart = () => {
    if (!props.authReducer.token) {
      history.push(urls.LOGIN);
    }

    const validatedSizeSelect = validateOne(sizeSelect);

    if (validatedSizeSelect.errorMessage) {
      setSizeSelect(validatedSizeSelect);
      return;
    }

    orderItemsApi
      .createOrderItem({
        productId: product.id,
        quantity,
        size: sizeSelect.value
      })
      .then(() => {
        setShowAddToCartSuccess(true);
      })
      .catch(() => {
        setShowAddToCartError(true);
      });
  };

  useEffect(() => {
    if (product) {
      if (product.sizes) {
        const _sizes = product.sizes.split(' ');

        setSizes(
          _sizes.map((size) => {
            return { key: size, value: size, text: mapSizes[size] || size };
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    product && (
      <>
        <Container fluid className="product-options p-0 mt-4 mt-lg-0">
          <Row>
            <Col>
              <Link to={`${urls.STORES}/${product.store.id}`}>
                {product.store.name}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="h2 mb-4">{product.name}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label className="text-bold mb-1">{sizeSelect.label}</label>
              <CustomSelect
                placeholder="Επέλεξε μέγεθος"
                options={sizes}
                errorMessage={sizeSelect.errorMessage}
                onChange={(e, value) => {
                  setSizeSelect(validateOne({ ...sizeSelect, value }));
                }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label className="text-bold mb-1">Ποσότητα</label>
              <Counter onChange={setQuantity} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label className="text-bold mb-1 d-block">Τιμή</label>
              <ProductPrices product={product} textSize="xl" />
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col>
              <Button className="custom primary mr-3" onClick={addToCart}>
                Προσθήκη στο καλάθι
              </Button>

              {product.isFavorite ? (
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
        {props.productsReducer.isFetchingProductsError && (
          <Message
            negative
            content={props.productsReducer.isFetchingProductsError}
          />
        )}
        {showAddToCartSuccess && (
          <Message
            success
            content="Το προϊόν προστέθηκε στο καλάθι."
            onDismiss={() => setShowAddToCartSuccess(false)}
          />
        )}
        {showAddToCartError && (
          <Message
            negative
            content="Σφάλμα κατά την προσθήκη στο καλάθι."
            onDismiss={() => setShowAddToCartError(false)}
          />
        )}
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer,
    authReducer: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: () => dispatch(addToFavorites()),
    removeFromFavorites: () => dispatch(removeFromFavorites())
  };
};

ProductOptions.propTypes = {
  productsReducer: PropTypes.object,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  authReducer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions);
