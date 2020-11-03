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
import Products from '../components/Products';

// Redux Actions
import { fetchProducts } from '../redux/Products/products.actions';
import { fetchSellers } from '../redux/Sellers/sellers.actions';

const ProductPage = (props) => {
  const [productId, setProductId] = useState(parseInt(props.match.params.id));
  const [product, setProduct] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (!props.match.params.id) {
      history.push(urls.NOT_FOUND);
    }

    window.scrollTo(0, 0);

    props.fetchProducts(parseInt(props.match.params.id));
  }, [props.match.params.id]);

  useEffect(() => {
    const productFromStore = props.productsReducer.data.find(
      (product) => product.id === parseInt(props.match.params.id)
    );

    setProductId(parseInt(props.match.params.id));

    if (productFromStore) {
      setProduct(productFromStore);
      props.fetchSellers(productFromStore.seller.id);
    }
  }, [props.productsReducer.data]);

  useEffect(() => {
    if (is.notEmptyObject(product)) {
      props.fetchSellers(product.seller.id);
    }
  }, [product]);

  return (
    <>
      {props.productsReducer.isFetchingSellers && (
        <Loading loading={props.productsReducer.loading} fullHeight />
      )}
      {is.notEmptyObject(product) && (
        <>
          <section>
            <Container>
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
          </section>

          <section className="bg-background-dark mb-0">
            <Container>
              <Row>
                <Col md={4}>
                  <h3>{get.safe(() => product.seller.name)}</h3>
                  <div className="mb-1">
                    {get.safe(() => product.seller.stars) ? (
                      <>
                        <Rating
                          defaultRating={product.seller.stars}
                          maxRating={5}
                          disabled
                        />
                        <span className="pl-1 text-sm">
                          ({product.ratings})
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    {get.safe(() => product.seller.totalOrders)} Συνολικές
                    παραγγελίες
                  </div>
                  <div>
                    <Link
                      to={urls.SELLERS + get.safe(() => product.seller.id, '')}
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
          {get.safe(() => props.sellersReducer.data[0].products.length, 0) >
            1 && (
            <section className="bg-background-dark pt-0">
              <Container>
                <Row>
                  <Col>
                    <h3 className="mb-3">Περισσότερα προϊόντα στο κατάστημα</h3>

                    <Products
                      data={get.safe(
                        () => props.sellersReducer.data[0].products,
                        []
                      )}
                      loading={props.sellersReducer.isFetchingSellers}
                      exclude={[product.id]}
                    />
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
    sellersReducer: state.sellersReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (id) => dispatch(fetchProducts(id)),
    fetchSellers: (id) => dispatch(fetchSellers(id))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  productsReducer: PropTypes.object,
  sellersReducer: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
