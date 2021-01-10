import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import { Rating } from 'semantic-ui-react';

const ProductRatings = (props) => {
  const renderRatings = () => {
    const { ratings } = props;

    return ratings.length
      ? ratings.map((rating) => (
          <div key={rating.id} className="product-rating-container">
            <div className="d-flex align-items-center">
              <Rating
                maxRating={5}
                rating={rating.stars}
                disabled
                className="mr-2"
              />
              <span className="text-semi-bold text-sm text-muted mr-2">
                {rating.user.lastName} {rating.user.firstName}
              </span>
              <span className="text-sm text-muted">
                ({moment(rating.updatedAt).format('DD-MM-YYYY')})
              </span>
            </div>

            {rating.text ? <p className="mt-2">{rating.text}</p> : null}
          </div>
        ))
      : null;
  };

  return (
    <Container>
      <Row>
        <Col>{renderRatings()}</Col>
      </Row>
    </Container>
  );
};

ProductRatings.propTypes = {
  ratings: PropTypes.array.isRequired
};

export default ProductRatings;
