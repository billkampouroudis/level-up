import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';

// Components
import CustomModal from '../CustomModal';
import AddressForm from '../../forms/address/AddressForm';
import { propTypes } from 'react-bootstrap/esm/Image';

const AddressModal = (props) => {
  const [submitForm, setSubmitForm] = useState(null);
  const [cancelForm, setCancelForm] = useState(null);

  return (
    <CustomModal {...props}>
      <AddressForm onCancel={props.onClose} onSuccess={props.onClose} />
    </CustomModal>
  );
};

AddressModal.propTypes = {
  onClose: PropTypes.func
};

export default AddressModal;
