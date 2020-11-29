import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from '../../pages/router/Urls';
import { Locked32, Favorite32, FavoriteFilled32 } from '@carbon/icons-react';
import { validateOne } from '../../utils/validation/index';

// Component
import Counter from '../misc/Counter';
import Button from '../Ui/Button';
import ErrorAlert from '../Alerts/ErrorAlert';
import CustomSelect from '../Inputs/CustomSelect';

// Redux Actions
import { addToFavorites } from '../../redux/Products/products.actions';

const ProductOptions = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [sizeSelect, setSizeSelect] = useState({
    value: null,
    label: 'Μέγεθος',
    rules: {
      notEmpty: true
    },
    errorMessage: ''
  });
  const [sizes, setSizes] = useState([]);

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

  const handleFavorites = () => {
    setIsFavorite(!isFavorite);
    props.addToFavorites(product.id);
  };

  const addToCart = () => {
    const validatedSizeSelect = validateOne(sizeSelect);

    if (validatedSizeSelect.errorMessage) {
      setSizeSelect(validatedSizeSelect);
      return;
    }

    alert('success');
  };

  useEffect(() => {
    const _product = props.productsReducer.product;
    if (_product) {
      setProduct(_product);
    }
  }, []);

  useEffect(() => {
    if (product) {
      // setIsFavorite(!!product.isFavorite);

      if (product.sizes) {
        const _sizes = product.sizes.split(' ');

        setSizes(
          _sizes.map((size) => {
            return { key: size, value: size, text: mapSizes[size] || size };
          })
        );
      }
    }
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
                  {product.originalPrice}€
                </span>

                {product.discoundPrice && (
                  <span>
                    <Locked32 />
                    <span
                      className={`discount-price align-items-center ${
                        user ? 'text-primary' : 'text-danger'
                      }`}
                    >
                      {product.discoundPrice}
                    </span>
                  </span>
                )}
              </div>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col>
              <Button className="custom primary mr-3" onClick={addToCart}>
                Προσθήκη στο καλάθι
              </Button>

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
        {props.productsReducer.isFetchingProductsError && (
          <ErrorAlert message={props.productsReducer.isFetchingProductsError} />
        )}
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: (id) => dispatch(addToFavorites(id))
  };
};

ProductOptions.propTypes = {
  productsReducer: PropTypes.object,
  addToFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions);
