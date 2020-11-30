import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/Urls';
import { Rating } from 'semantic-ui-react';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import Products from '../components/Products';

// Images
import HeroImage from '../assets/images/Hero-Image-4.jpg';

// Redux Actions
import { getStore } from '../redux/Stores/stores.actions';
import { listStoreProducts } from '../redux/Products/products.actions';

const StorePage = (props) => {
  const history = useHistory();

  function checkForError() {
    if (props.storesReducer.getStoreError) {
      return <ErrorAlert message={props.storesReducer.getStoreError.message} />;
    }
  }

  useEffect(() => {
    const storeId = parseInt(props.match.params.id);

    if (storeId) {
      props.getStore(storeId);
      props.listStoreProducts(storeId);
    } else {
      history.push(urls.NOT_FOUND);
    }
  }, [history, props.match.params.id]);

  checkForError();

  return (
    <>
      {!props.storesReducer.isGettingStore && props.storesReducer.store ? (
        <>
          <Header backgroundImage={HeroImage} className="store" />
          <section>
            <Container>
              <Row>
                <Col>
                  <div className="d-flex align-content-center mb-3">
                    <Rating
                      defaultRating={props.storesReducer.store.stars}
                      maxRating={5}
                      disabled
                      size="huge"
                    />
                    <span className="pl-1 text-sm">
                      ({props.storesReducer.store.ratings || 0})
                    </span>
                  </div>

                  <h1 className="d-inline-block">
                    {props.storesReducer.store.brandName}
                  </h1>

                  {props.storesReducer.store.ratings && (
                    <p>{props.storesReducer.store.description}</p>
                  )}
                </Col>
              </Row>
            </Container>
          </section>

          {!props.productsReducer.isListingProductsByStore &&
            props.productsReducer.products.length && (
              <section className="pt-0">
                <Container>
                  <Row>
                    <Col>
                      <h3 className="mb-3">Προϊόντα</h3>
                      <Products data={props.productsReducer.products} />
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
        </>
      ) : (
        <Loading loading={props.storesReducer.isGettingStore} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storesReducer: state.storesReducer,
    productsReducer: state.productsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStore: (id) => dispatch(getStore.call(id)),
    listStoreProducts: (id) => dispatch(listStoreProducts.call(id))
  };
};

StorePage.propTypes = {
  storesReducer: PropTypes.object,
  productsReducer: PropTypes.object,
  getStore: PropTypes.func,
  match: PropTypes.object,
  listStoreProducts: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
