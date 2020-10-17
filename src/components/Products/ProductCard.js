import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../pages/router/Urls';
import { StarFilled16, StarHalf16, Locked24 } from '@carbon/icons-react';

import './style.scss';

const ProductCard = (props) => {
  const { product } = props;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < Math.floor(product.stars); i++) {
      stars.push(<StarFilled16 key={i} />);
    }

    if (product.stars % 1 !== 0) {
      stars.push(<StarHalf16 key={stars.length} />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      <Link to={urls.PRODUCTS + product.id}>
        <div className="image">
          <img src={product.image} alt="product1" />
        </div>
      </Link>

      <div className="content">
        <div className="rating mb-1">
          {renderStars()}
          <span className="pl-1 text-sm">(23)</span>
        </div>
        <Link to={urls.PRODUCTS + product.id}>
          <div className="name">
            <p className="text-lg">{product.name}</p>
          </div>
        </Link>
        <div className="price text-semi-bold mb-1">
          <span className="mr-2">{product.originalPrice}€</span>
          <span>
            <Locked24 />
            {product.reducedPrice}€
          </span>
        </div>

        <div className="seller text-sm">
          <Link to={urls.SELLERS + product.seller.id}>
            {product.seller.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
