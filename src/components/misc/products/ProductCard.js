import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';
import { Locked24 } from '@carbon/icons-react';
import { Rating } from 'semantic-ui-react';
import get from '../../../utils/misc/get';

// Images
import ilImages from '../../../assets/images/il-images.svg';

const ProductCard = (props) => {
  const { product } = props;

  const productUrl = `${urls.PRODUCTS}/${product.id}`;

  return (
    <div className="product-card">
      <Link to={productUrl}>
        <div className="image-container">
          <figure>
            <img
              src={get.safeImageSrc(product.image, ilImages)}
              alt={product.description}
            />
          </figure>
        </div>
      </Link>

      <div className="content">
        <div className="rating mb-1">
          <Rating defaultRating={product.stars} maxRating={5} disabled />
          <span className="pl-1 text-sm">({product.ratings || 0})</span>
        </div>
        <Link to={productUrl}>
          <div className="name">
            <p className="text-lg">{product.name}</p>
          </div>
        </Link>
        <div className="price  mb-1">
          <span className="mr-2 text-semi-bold">{product.originalPrice}€</span>
          {product.reducedPrice && (
            <span>
              <Locked24 />
              {product.reducedPrice}€
            </span>
          )}
        </div>

        <div className="store text-sm">
          <Link to={`${urls.STORES}/${product.store.id}`}>
            {product.store.brandName}
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
