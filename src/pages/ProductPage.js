import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';
import is from '../utils/misc/is';
import get from '../utils/misc/get';
import { Rating } from 'semantic-ui-react';

// import styles from '../assets/styles/_variables.scss';

// Components
import Loading from '../components/Loading';
import ProductOptions from '../components/Products/ProductOptions';
import Button from '../components/Ui/Button';
// import Products from '../components/Products';

// Images
import ilImages from '../assets/images/il-images.svg';

// Redux Actions
import { getProduct, listProducts } from '../redux/Products/products.actions';
import { getStore } from '../redux/Stores/stores.actions';

// Hooks
import useDidMountEffect from '../utils/hooks/useDidMountEffect';

// API Calls
// import productsApi from '../api/products';

const ProductPage = (props) => {
  const [product, setProduct] = useState({});
  // const [otherProducts, setOtherProducts] = useState([]);

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
      const _product = props.productsReducer.data[0];
      if (!_product) {
        history.push(urls.NOT_FOUND);
      }

      setProduct(_product);
      listOtherStoreProducts(_product.store.id);
    }
  }, [props.productsReducer.isGettingProduct]);

  function listOtherStoreProducts(id) {
    console.warn('TODO');

    // productsApi.listProducts(id).then((res) => {
    //   console.log(res);
    // });
  }

  return (
    <>
      {props.productsReducer.isGettingStores || is.emptyObject(product) ? (
        <Loading loading={props.productsReducer.loading} fullHeight />
      ) : (
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
                  <img
                    src={get.safeImageSrc(product.image, ilImages)}
                    className={`product-image `}
                    alt={product.name}
                    style={
                      !is.correctImageSrc(product.image) && {
                        maxWidth: '150px'
                      }
                    }
                  />
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
                    <Link
                      to={`${urls.STORE}/${get.safe(
                        () => product.store.id,
                        ''
                      )}`}
                    >
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
          {!props.storesReducer.isGettingStores &&
            get.safe(() => props.storesReducer.data[0].products.length, 0) >
              1 && (
              <section className="bg-background-dark">
                <Container>
                  <Row>
                    <Col>
                      <h3 className="mb-3">
                        Περισσότερα προϊόντα στο κατάστημα
                      </h3>

                      {/* <Products
                        data={otherProducts}
                        exclude={[product.id]}
                      /> */}
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productsReducer: state.productsReducer,
    storesReducer: state.storesReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct.call(id)),
    listProducts: (id) => dispatch(listProducts.call()),
    getStore: (id) => dispatch(getStore.call(id))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  productsReducer: PropTypes.object,
  storesReducer: PropTypes.object,
  listProducts: PropTypes.func,
  getStore: PropTypes.func,
  getProduct: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
