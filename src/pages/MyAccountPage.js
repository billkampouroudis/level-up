import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from '../utils/misc/get';
import { levels, calculateUserLevel } from '../utils/levels/levels';
import { Link } from 'react-router-dom';
import urls from './router/urls';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import { Statistic } from 'semantic-ui-react';
import MainHeader from '../components/misc/header/MainHeader';
import SEO from '../components/misc/seo/SEO';

// Images
import HeroImage2 from '../assets/images/Hero-Image-2.jpg';

const MyAccountPage = (props) => {
  const { user } = props.userReducer;

  const [level, setLevel] = useState(0);
  const [nextLevelAt, setNextLevelAt] = useState(0);

  useEffect(() => {
    const level = calculateUserLevel(get.safe(() => user.xp));
    setLevel(level);

    let nextLevelAt = '-';
    if (level !== 10) {
      nextLevelAt = levels(level + 1).minXp;
    }

    setNextLevelAt(nextLevelAt);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <SEO title="Λογαριασμός" />
      <MainHeader style={{ backgroundImage: `url(${HeroImage2})` }} />
      <section className="bg-background-dark">
        <Container>
          <Row>
            <Col>
              <h1 className="mb-4">Λογαριασμός</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-lg">
                <strong>Βρίσκεστε στο level {level}</strong>. Έχετε πρόσβαση σε
                όλες τις προσφορές που ανήκουν στο ίδιο level με εσάς.
              </p>
              <p className="text-lg mb-4">
                Για να προχωρήσετε στο <strong>επόμενο level</strong> θα πρέπει
                να μαζέψετε <strong>{nextLevelAt} πόντους</strong> .
              </p>
              <p className="text-lg mb-4">
                Μπορείτε να δείτε αναλυτικά τον πίνακα των level και την έκπτωση
                που κερδίζεται σε καθένα από αυτά πατώντας{' '}
                <Link to={`${urls.ABOUT}`}>εδώ</Link>
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={4}
              className="text-center text-sm-left mb-4 mb-sm-0"
            >
              <Statistic>
                <Statistic.Value>{level}</Statistic.Value>
                <Statistic.Label>ΤΟ LEVEL ΜΟΥ</Statistic.Label>
              </Statistic>
            </Col>
            <Col
              xs={12}
              sm={4}
              className="text-center text-sm-left mb-4 mb-sm-0"
            >
              <Statistic>
                <Statistic.Value>
                  {get.safe(() => user.xp) || 0}
                </Statistic.Value>
                <Statistic.Label>ΟΙ ΠΟΝΤΟΙ ΜΟΥ</Statistic.Label>
              </Statistic>
            </Col>
            <Col
              xs={12}
              sm={4}
              className="text-center text-sm-left mb-4 mb-sm-0"
            >
              <Statistic>
                <Statistic.Value>{nextLevelAt}</Statistic.Value>
                <Statistic.Label>ΕΠΟΜΕΝΟ LEVEL</Statistic.Label>
              </Statistic>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

MyAccountPage.propTypes = {
  userReducer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);
