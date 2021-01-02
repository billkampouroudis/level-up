import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { Popup } from 'semantic-ui-react';
import { calculateUserLevel } from '../../../utils/levels/levels';
import { getReducedPrice } from '../../../utils/prices/prices';
import get from '../../../utils/misc/get';

const ProductPrices = (props) => {
  const { product, userReducer, quantity } = props;
  const userLevel = calculateUserLevel(get.safe(() => userReducer.user.xp));

  return (
    <div
      className={`d-flex align-items-center text-${props.textSize} text-semi-bold`}
    >
      <span
        className={`mr-2${
          product.discountLevel === userLevel ? ' text-line-through' : ''
        }`}
      >
        {(product.originalPrice * quantity).toFixed(2)}€
      </span>
      {product.discountLevel && (
        <Popup
          trigger={
            <span
              className={`d-flex align-items-center ${
                product.discountLevel === userLevel
                  ? 'text-accent'
                  : 'text-danger opacity-75'
              }`}
            >
              <img
                src={`/icons/levels/${
                  product.discountLevel === userLevel ? 'Unlocked' : 'Locked'
                }-${product.discountLevel}.svg`}
                alt={`Level ${product.discountLevel} discount`}
              />
              <span
                className={
                  product.discountLevel > userLevel ? 'text-line-through' : null
                }
              >
                {getReducedPrice(product, quantity)}€
              </span>
            </span>
          }
        >
          {product.discountLevel === userLevel
            ? 'Έχετε ξεκλειδώσει την συγκεκριμένη προσφορά.'
            : `Για να ξεκλειδώσετε την συγκεκριμένη προσφορά πρέπει να βρίσκεστε τουλάχιστον στο level ${product.discountLevel}.`}
        </Popup>
      )}
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

ProductPrices.defaultProps = {
  quantity: 1,
  textSize: 'lg'
};

ProductPrices.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number,
  userReducer: PropTypes.object,
  textSize: PropTypes.oneOf(['sm', 'lg', 'xl'])
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPrices);
