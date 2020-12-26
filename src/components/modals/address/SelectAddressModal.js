import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomModal from '../CustomModal';
import AddressList from '../../misc/selectAddress/AddressList';

const SelectAddressModal = (props) => {
  return (
    <CustomModal {...props}>
      <AddressList
        addresses={props.addresses}
        onUpdateAddress={() => props.onUpdateAddress && props.onUpdateAddress()}
        onSelectAddress={(data) =>
          props.onSelectAddress && props.onSelectAddress(data)
        }
      />
    </CustomModal>
  );
};

SelectAddressModal.propTypes = {
  onClose: PropTypes.func,
  addresses: PropTypes.array.isRequired,
  onUpdateAddress: PropTypes.func,
  onSelectAddress: PropTypes.func
};

export default SelectAddressModal;
