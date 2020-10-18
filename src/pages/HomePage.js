import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import Counter from '../components/Counter';

// Components
import Products from '../components/Products';
import Header from '../components/Header';

// Images
import HeroImage1 from '../assets/images/Hero-Image.jpg';
import HeroImage2 from '../assets/images/Hero-Image-2.jpg';
import HeroImage3 from '../assets/images/Hero-Image-3.jpg';
import HeroImage4 from '../assets/images/Hero-Image-4.jpg';

const HomePage = () => {
  const [heroImage, setHeroImage] = useState(HeroImage1);

  useEffect(() => {
    setTimeout(() => {
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
  }, [heroImage]);
  return (
    <>
      <Header backgroundImage={heroImage} height="820px">
        <Container fluid className="home-hero">
          <Container>
            <Row>
              <Col>
                <header>
                  <h1 className="text-white">
                    Ανέβασε <span className="text-bold">level</span> στις αγορές
                    σου!
                  </h1>
                  <p className="text-white text-xl">
                    Ξεκλείδωσε νέες προσφορές με κάθε νέο level που κατακτάς.
                  </p>
                </header>
              </Col>
            </Row>
          </Container>
        </Container>
      </Header>

      <Products />
    </>
  );
};

export default HomePage;
