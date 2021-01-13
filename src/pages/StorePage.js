import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import urls from './router/Urls';

// Utils
import get from '../utils/misc/get';

// Components
import { Phone16, At16 } from '@carbon/icons-react';
import { Container, Row, Col } from 'react-bootstrap';
import { Message, Loader } from 'semantic-ui-react';
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

  const { storesReducer } = props;
  const { store, isGettingStore, isListingProductsByStore } = storesReducer;

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
      <SEO title={get.safe(() => store.brandName)} />
      {!isGettingStore && store ? (
        <>
          <MainHeader
            style={{ backgroundImage: `url(${HeroImage})` }}
            className="store"
          />
          <section>
            <Container>
              <Row>
                <Col>
                  <h1 className="d-inline-block">{store.brandName}</h1>

                  <div>
                    {get.safe(() => store.contactEmail) && (
                      <span className="mr-3">
                        <At16 className="text-accent" />
                        <span className="mb-1 ml-1">{store.contactEmail}</span>
                      </span>
                    )}

                    {get.safe(() => store.contactPhone) && (
                      <span>
                        <Phone16 className="text-accent" />
                        <span className="mb-1 ml-1">{store.contactPhone}</span>
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {!isListingProductsByStore && props.productsReducer.products.length && (
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
