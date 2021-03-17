import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomModal from '../CustomModal';
import ProductRatingForm from '../../forms/ratings/ProductRatingForm';

// Utils
import { giveXpFromRating } from '../../../utils/points/points';

const ProductRatingModal = (props) => {
  const onSuccess = () => {
    props.onSuccess && props.onSuccess();
    props.onClose();
  };

  return (
    <CustomModal {...props}>
      <p className="text-lg text-semi-bold mb-4">
        Με κάθε αξιολόγηση κερδίζετε{' '}
        <span className="text-success">{giveXpFromRating()} XP</span>!
      </p>

      <ProductRatingForm
        onCancel={props.onClose}
        onSuccess={onSuccess}
        product={props.product}
      />
    </CustomModal>
  );
};

ProductRatingModal.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  product: PropTypes.object.isRequired
};

export default ProductRatingModal;
