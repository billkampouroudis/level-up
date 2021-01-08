import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import urls from './router/urls';
import { Message, Loader } from 'semantic-ui-react';

// Utils
import get from '../utils/misc/get';

// Components
import MainHeader from '../components/misc/header/MainHeader';
import ProductsList from '../components/misc/products/ProductsList';
import SEO from '../components/misc/seo/SEO';

// Images
import HeroImage from '../assets/images/Hero-Image-4.jpg';

// Redux Actions
import { getStore } from '../redux/stores/stores.actions';
import { listStoreProducts } from '../redux/products/products.actions';

const StorePage = (props) => {
  const history = useHistory();

  function checkForError() {
    if (props.storesReducer.getStoreError) {
      return (
        <Message negative content={props.storesReducer.getStoreError.message} />
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, props.match.params.id]);

  checkForError();

  return (
    <>
      <SEO title={get.safe(() => props.storesReducer.store.brandName, null)} />

      {!props.storesReducer.isGettingStore && props.storesReducer.store ? (
        <>
          <MainHeader
            style={{ backgroundImage: `url(${HeroImage})` }}
            className="store"
          />
          <section>
            <Container>
              <Row>
                <Col>
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
                      <ProductsList data={props.productsReducer.products} />
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
