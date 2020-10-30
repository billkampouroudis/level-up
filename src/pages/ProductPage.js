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
import { fetchSellerProducts } from '../redux/Sellers/sellers.actions';

const ProductPage = (props) => {
  const { match, fetchProducts } = props;
  const productId = parseInt(match.params.id);

  const [product, setProduct] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (props.productsReducer.isFetchingProductsError) {
      history.push(urls.NOT_FOUND);
    }

    if (props.productsReducer.data.length) {
      setProduct(
        props.productsReducer.data.find((product) => product.id === productId)
      );
    } else {
      fetchProducts(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProduct(
      props.productsReducer.data.find((product) => product.id === productId)
    );
  }, [props.productsReducer.data]);

  useEffect(() => {
    if (is.notEmptyObject(product)) {
      props.fetchSellerProducts(product.seller.id);
    }
  }, [product]);

  return (
    <>
      <Loading loading={props.productsReducer.loading} fullHeight />
      {product && !props.productsReducer.isFetchingProductsError && (
        <>
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
          <section className="bg-background-dark mb-0">
            <Container>
              <Row>
                <Col md={4}>
                  <h3>{get.safe(() => product.seller.name)}</h3>
                  <div className="mb-1">
                    {get.safe(() => product.seller.stars) ? (
                      <Rating
                        defaultRating={product.seller.stars}
                        maxRating={5}
                        disabled
                      />
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
        </>
      )}

      <section className="bg-background-dark">
        <Container>
          <Row>
            <Col>
              <h3 className="mb-3">Περισσότερα προϊόντα στο κατάστημα</h3>

              <Products
                data={get.safe(() => props.sellersReducer.data[0].products, [])}
                loading={props.sellersReducer.isFetchingSellerProducts}
              />
            </Col>
          </Row>
        </Container>
      </section>
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
    fetchSellerProducts: (id) => dispatch(fetchSellerProducts(id))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  productsReducer: PropTypes.object,
  sellersReducer: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
