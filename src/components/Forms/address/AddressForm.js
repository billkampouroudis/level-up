import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';
import {
  validateAll,
  haveErrors,
  handleOnBlur,
  handleOnKeyUp
} from '../../../utils/validation';

// Components
import CustomTextInput from '../../formElements/textInput/CustomTextInput';

// API
import addressesApi from '../../../api/addresses';

const AddressForm = (props) => {
  let initialInputs = {
    firstName: {
      label: 'Όνομα',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 45
      },
      errorMessage: ''
    },
    lastName: {
      label: 'Επώνυμο',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 45
      },
      errorMessage: ''
    },
    street: {
      label: 'Οδός',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 100
      },
      errorMessage: ''
    },
    number: {
      label: 'Αριθμός',
      value: '',
      rules: {
        notEmpty: true,
        numeric: true
      },
      errorMessage: ''
    },
    zipCode: {
      label: 'Ταχ. κώδικας',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 10
      },
      errorMessage: ''
    },
    city: {
      label: 'Πόλη',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 50
      },
      errorMessage: ''
    },
    country: {
      label: 'Χώρα',
      value: 'Ελλάδα',
      rules: {
        notEmpty: true,
        maxLength: 50
      },
      errorMessage: ''
    },
    floor: {
      label: 'Όροφος',
      value: '',
      rules: {
        notEmpty: true,
        numeric: true
      },
      errorMessage: ''
    }
  };

  const formId = props.index ? `address-form-${props.index}` : 'address-form';

  const [inputs, setInputs] = useState(initialInputs);

  const onSubmit = () => {
    const validatedInputs = validateAll(inputs);
    setInputs(validatedInputs);

    if (!haveErrors(validatedInputs)) {
      const data = {
        street: inputs.street.value,
        number: inputs.number.value,
        zipCode: inputs.zipCode.value,
        city: inputs.city.value,
        country: inputs.country.value,
        floor: inputs.floor.value
      };

      if (props.address) {
        addressesApi.updateAddress(props.address.id, data).then(() => {
          clearInputs();
          props.onSuccess && props.onSuccess();
        });
      } else {
        addressesApi.createAddress(data).then(() => {
          clearInputs();
          props.onSuccess && props.onSuccess();
        });
      }
    }
  };

  const onCancel = () => {
    clearInputs();
    props.onCancel && props.onCancel();
  };

  const clearInputs = () => {
    setInputs(initialInputs);
    document.getElementById('address-form').reset();
  };

  const renderInputs = () => {
    return Object.keys(inputs).map((key) => {
      const input = inputs[key];
      return (
        <Col md={6} key={key}>
          <Form.Field>
            <CustomTextInput
              label={input.label}
              placeholder={input.placeholder}
              onKeyUp={(e) => setInputs(handleOnKeyUp(e, key, inputs))}
              onBlur={(e) => setInputs(handleOnBlur(e, key, inputs))}
              defaultValue={input.value}
              errorMessage={input.errorMessage}
              name={key}
            />
          </Form.Field>
        </Col>
      );
    });
  };

  const setInitialInputs = () => {
    if (props.address) {
      const _inputs = Object.keys(inputs).map((inputKey) => {
        const input = inputs[inputKey];
        input.value = props.address[inputKey];
        return input;
      });

      initialInputs = _inputs;
    }
  };

  useEffect(() => {
    setInitialInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address, props.rerender]);

  return (
    <Form id={formId}>
      <Row>{renderInputs()}</Row>
      <Row>
        <Col>
          <div className="d-sm-flex flex-sm-row-reverse">
            <Button className="custom primary" onClick={onSubmit}>
              {props.submitText || 'Δημιουργία'}
            </Button>
            <Button
              className="custom secondary mr-0 mr-sm-1"
              onClick={onCancel}
            >
              {props.cancelText || 'Άκυρο'}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

AddressForm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  address: PropTypes.object,
  index: PropTypes.number,
  rerender: PropTypes.any
};

export default AddressForm;
