import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import Counter from '../components/Counter';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../pages/router/Urls';

// Components
import { Button } from 'semantic-ui-react';
import SEO from '../components/misc/seo/SEO';
import ProductsList from '../components/misc/products/ProductsList';
import MainHeader from '../components/misc/header/MainHeader';

// Images
import HeroImage1 from '../assets/images/Hero-Image.jpg';
import HeroImage2 from '../assets/images/Hero-Image-2.jpg';
import HeroImage3 from '../assets/images/Hero-Image-3.jpg';
import HeroImage4 from '../assets/images/Hero-Image-4.jpg';

// Reduc actions
import { listProducts } from '../redux/products/products.actions';

const HomePage = (props) => {
  const [heroImage, setHeroImage] = useState(HeroImage1);

  useEffect(() => {
    props.listProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const changeHeroImage = setTimeout(() => {
      switch (heroImage) {
        case HeroImage1:
          setHeroImage(HeroImage2);
          break;
        case HeroImage2:
          setHeroImage(HeroImage3);
          break;
        case HeroImage3:
          setHeroImage(HeroImage4);
          break;
        default:
          setHeroImage(HeroImage1);
      }
    }, 6000);

    return () => {
      clearTimeout(changeHeroImage);
    };
  }, [heroImage]);

  return (
    <>
      <SEO title="Αρχική" />
      <MainHeader
        style={{ backgroundImage: `url(${heroImage})` }}
        className="home"
      >
        <div className="content">
          <Container>
            <Row>
              <Col>
                <h1>
                  Ανεβάστε <span className="text-bold">level</span> στις αγορές
                  σας!
                </h1>
                <p className="text-xl mb-4">
                  Ξεκλειδώστε νέες προσφορές με κάθε νέο level που κατακτάτε.
                </p>
                <Link to={urls.ABOUT}>
                  <Button className="custom primary">Μάθετε περισσότερα</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </MainHeader>

      <section>
        <ProductsList data={props.productsReducer.products} />
      </section>
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
    listProducts: (id) => dispatch(listProducts.call(id))
  };
};

HomePage.propTypes = {
  listProducts: PropTypes.func,
  productsReducer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
