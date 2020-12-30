import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from '../utils/misc/get';
import { calculateUserLevel } from '../utils/levels/levels';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import { Statistic } from 'semantic-ui-react';
import MainHeader from '../components/misc/header/MainHeader';

// Images
import HeroImage2 from '../assets/images/Hero-Image-2.jpg';

const MyAccountPage = (props) => {
  const { user } = props.userReducer;

  return (
    <>
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
              <Statistic className="mr-5">
                <Statistic.Value>
                  {calculateUserLevel(get.safe(() => user.xp))}
                </Statistic.Value>
                <Statistic.Label>Level</Statistic.Label>
              </Statistic>
              <Statistic className="m-0">
                <Statistic.Value>
                  {get.safe(() => user.xp) || 0}
                </Statistic.Value>
                <Statistic.Label>ΠΟΝΤΟΙ</Statistic.Label>
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
