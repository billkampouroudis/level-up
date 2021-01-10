import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DEFAULT_PAGINATION_SIZE } from '../../../constants';

// Components
import { Rating } from 'semantic-ui-react';
import CustomPagination from '../pagination/CustomPagination';
import Illustration from '../illustrations/Illustration';

// API
import productRatingsApi from '../../../api/productRatings';

// Images
import NoRatingsIl from '../../../assets/illustrations/undraw_reviews_lp8w.svg';

const ProductRatings = (props) => {
  const [ratings, setRatings] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: DEFAULT_PAGINATION_SIZE,
    page: 1,
    totalPages: null
  });

  const listRatigns = () => {
    const options = { params: [] };
    options.params.push([`productId=${props.productId}`]);
    options.params.push([`pageSize=${pagination.pageSize}`]);
    options.params.push([`page=${pagination.page}`]);

    productRatingsApi
      .listProductRatings(options)
      .then((res) => {
        setRatings(res.data);
        setPagination({ ...pagination, totalPages: res.totalPages });
      })
      .catch();
  };

  const handlePageChange = (e, { activePage }) => {
    setPagination({ ...pagination, page: activePage });
  };

  useEffect(() => {
    if (props.productId) {
      listRatigns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productId, pagination.page]);

  const renderRatings = () => {
    return ratings.map((rating) => (
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
    ));
  };

  return ratings.length ? (
    <CustomPagination
      defaultActivePage={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={handlePageChange}
    >
      {renderRatings()}
    </CustomPagination>
  ) : (
    <Illustration
      img={NoRatingsIl}
      description="Δεν βρέθηκαν κριτικές για το προϊόν"
      className="text-center mt-4 mb-0"
    />
  );
};

ProductRatings.propTypes = {
  productId: PropTypes.number.isRequired
};

export default ProductRatings;
