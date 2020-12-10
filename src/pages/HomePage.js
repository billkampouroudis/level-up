import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import Counter from '../components/Counter';
import PropTypes from 'prop-types';

// Components
import Products from '../components/Products';
import Header from '../components/Header';
import CustomButton from '../components/Ui/CustomButton';

// Images
import HeroImage1 from '../assets/images/Hero-Image.jpg';
import HeroImage2 from '../assets/images/Hero-Image-2.jpg';
import HeroImage3 from '../assets/images/Hero-Image-3.jpg';
import HeroImage4 from '../assets/images/Hero-Image-4.jpg';

// Reduc actions
import { listProducts } from '../redux/Products/products.actions';

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
      <Header backgroundImage={heroImage} className="home">
        <div className="content">
          <Container>
            <Row>
              <Col>
                <header>
                  <h1>
                    Ανέβασε <span className="text-bold">level</span> στις αγορές
                    σου!
                  </h1>
                  <p className="text-xl mb-4">
                    Ξεκλείδωσε νέες προσφορές με κάθε νέο level που κατακτάς.
                  </p>
                  <CustomButton className="custom primary">
                    Μάθετε περισσότερα
                  </CustomButton>
                </header>
              </Col>
            </Row>
          </Container>
        </div>
      </Header>

      <section>
        <Products data={props.productsReducer.products} />
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
  productsReducer: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
