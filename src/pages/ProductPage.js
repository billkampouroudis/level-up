import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/urls';
import is from '../utils/misc/is';
import get from '../utils/misc/get';
import { Rating, Button, Loader } from 'semantic-ui-react';

// Components
import ProductOptions from '../components/misc/products/ProductOptions';
import ProductsList from '../components/misc/products/ProductsList';

// Images
import ilImages from '../assets/images/il-images.svg';

// Redux Actions
import { getProduct } from '../redux/products/products.actions';
import { getStore } from '../redux/stores/stores.actions';
import { listSuggestionsByStore } from '../redux/suggestions/suggestions.actions';

// Hooks
import useDidMountEffect from '../utils/hooks/useDidMountEffect';

const ProductPage = (props) => {
  const [product, setProduct] = useState({});

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (props.match.params.id) {
      const productIdFromParams = parseInt(props.match.params.id);
      props.getProduct(productIdFromParams);
    } else {
      history.push(urls.NOT_FOUND);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  useDidMountEffect(() => {
    if (!props.productsReducer.isGettingProduct) {
      const _product = props.productsReducer.product;
      if (!_product) {
        history.push(urls.NOT_FOUND);
      }

      setProduct(_product);
      props.listSuggestionsByStore(_product.store.id);
    }
  }, [props.productsReducer.isGettingProduct]);

  if (get.safe(() => props.productsReducer.getProductError)) {
    console.error(props.productsReducer.getProductError);
  }

  return (
    <>
      {!props.productsReducer.isGettingProduct && !is.emptyObject(product) ? (
        <>
          <section className="pb-0 pb-sm-auto">
            <Container>
              <Row>
                <Col
                  md={6}
                  xl={7}
                  className={
                    !is.correctImageSrc(product.image) &&
                    'align-self-center text-center'
                  }
                >
                  <div className={`product-image`}>
                    <figure>
                      <img
                        src={get.safeImageSrc(product.image, ilImages)}
                        alt={product.name}
                        style={
                          !is.correctImageSrc(product.image)
                            ? {
                                maxWidth: '150px'
                              }
                            : {}
                        }
                      />
                    </figure>
                  </div>
                </Col>
                <Col md={6} xl={5}>
                  <ProductOptions />
                </Col>
              </Row>
            </Container>
          </section>

          <section className="mb-0">
            <Container>
              <Row>
                <Col md={6} lg={4} className="mb-4">
                  <h3>{get.safe(() => product.store.brandName)}</h3>

                  {get.safe(() => product.store.stars) && (
                    <div className="mb-1">
                      <Rating
                        defaultRating={product.store.stars}
                        maxRating={5}
                        disabled
                      />
                      <span className="pl-1 text-sm">{product.ratings}</span>
                    </div>
                  )}
                  {get.safe(() => product.store.totalOrders) && (
                    <div className="mb-3">
                      {product.store.totalOrders} Συνολικές παραγγελίες
                    </div>
                  )}
                  <div>
                    <Link to={`${urls.STORES}/${product.store.id}`}>
                      <Button className="custom secondary mr-3">
                        Επίσκεψη καταστήματος
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col>
                  <h3>Πληροφορίες προϊόντος</h3>
                  <p>{product.description}</p>
                </Col>
              </Row>
            </Container>
          </section>
          {!props.suggestionsReducer.isListingSuggestionsByStore &&
            props.suggestionsReducer.suggestions.length > 1 && (
              <section className="bg-background-dark">
                <Container>
                  <Row>
                    <Col>
                      <h3 className="mb-3">
                        Περισσότερα προϊόντα στο κατάστημα
                      </h3>

                      <ProductsList
                        data={props.suggestionsReducer.suggestions}
                        exclude={[product.id]}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
        </>
      ) : (
        <Loader active inline="centered" />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer,
    suggestionsReducer: state.suggestionsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct.call(id)),
    listSuggestionsByStore: (id) => dispatch(listSuggestionsByStore.call(id)),
    getStore: (id) => dispatch(getStore.call(id))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  productsReducer: PropTypes.object,
  suggestionsReducer: PropTypes.object,
  listSuggestionsByStore: PropTypes.func,
  getStore: PropTypes.func,
  getProduct: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
