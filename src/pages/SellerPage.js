import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import urls from '../pages/router/Urls';
import { Rating } from 'semantic-ui-react';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import Products from '../components/Products';

// Images
import HeroImage from '../assets/images/Hero-Image-4.jpg';

// Redux Actions
import { fetchSellers } from '../redux/Sellers/sellers.actions';

const SellerPage = (props) => {
  const history = useHistory();

  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    const sellerId = parseInt(props.match.params.id);
    if (sellerId) {
      props.fetchSellers(sellerId);
    } else {
      history.push(urls.NOT_FOUND);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPageError(props.sellersReducer.isFetchingSellersError);
  }, [props.sellersReducer.isFetchingSellersError]);

  return (
    <>
      {props.sellersReducer.isFetchingSellers ||
      !props.sellersReducer.data.length ? (
        <Loading fullHeight loading={props.sellersReducer.isFetchingSellers} />
      ) : (
        <>
          <Header backgroundImage={HeroImage} className="seller" />
          <section>
            <Container>
              <Row>
                <Col className="">
                  <div className="d-flex align-content-center mb-3">
                    <Rating
                      defaultRating={props.sellersReducer.data[0].stars}
                      maxRating={5}
                      disabled
                      size="huge"
                    />
                    <span className="pl-1 text-sm">
                      {props.sellersReducer.data[0].ratings} Αξιολογίσεις
                      προϊόντων
                    </span>
                  </div>
                  <h1 className="d-inline-block">Caliroots</h1>
                  <p>{props.sellersReducer.data[0].description}</p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="pt-0">
            <Container>
              <Row>
                <Col>
                  <h3 className="mb-3">Προϊόντα</h3>

                  <Products
                    data={() => props.sellersReducer.data[0].products}
                    loading={props.sellersReducer.isFetchingSellers}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
      {pageError ? <ErrorAlert message={pageError} /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    sellersReducer: state.sellersReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellers: (id) => dispatch(fetchSellers(id))
  };
};

SellerPage.propTypes = {
  sellersReducer: PropTypes.object,
  fetchSellers: PropTypes.func,
  match: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerPage);
