import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomModal from '../CustomModal';
import AddressForm from '../../forms/address/AddressForm';

const AddressModal = (props) => {
  const onSuccess = () => {
    props.onSuccess && props.onSuccess();
    props.onClose();
  };

  return (
    <CustomModal {...props}>
      <AddressForm onCancel={props.onClose} onSuccess={onSuccess} />
    </CustomModal>
  );
};

AddressModal.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
};

export default AddressModal;
