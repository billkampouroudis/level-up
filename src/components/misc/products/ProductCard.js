import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urls from '../../../pages/router/urls';

// Utils
import get from '../../../utils/misc/get';

// Components
import { Rating } from 'semantic-ui-react';
import ProductPrices from './ProductPrices';

const ProductCard = (props) => {
  const { product } = props;

  const productUrl = `${urls.PRODUCTS}/${product.id}`;

  return (
    <div className="product-card">
      <Link to={productUrl}>
        <div className="product-image-container">
          <figure>
            <img src={product.image} alt={product.description} />
          </figure>
        </div>
      </Link>

      <div className="content">
        <div className="rating mb-1">
          <Rating
            rating={get.safe(() => product.ratings.stars, 0)}
            maxRating={5}
            disabled
          />
          <span className="pl-1 text-sm">
            ({get.safe(() => product.ratings.count, 0)})
          </span>
        </div>
        <Link to={productUrl}>
          <div className="name">
            <p className="text-lg">{product.name}</p>
          </div>
        </Link>
        <div className="price mb-1">
          <ProductPrices product={product} />
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

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  userReducer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
