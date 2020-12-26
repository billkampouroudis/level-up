import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';
import {
  validateAll,
  validateOne,
  haveErrors,
  handleOnBlur,
  handleOnKeyUp
} from '../../../utils/validation';

// Components
import CustomTextInput from '../../formElements/textInput/CustomTextInput';

// API
import addressesApi from '../../../api/addresses';

const AddressForm = (props) => {
  const initialInputs = {
    street: {
      label: 'Οδός',
      placeholder: 'Ιερού Λόχου',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 100
      },
      errorMessage: ''
    },
    number: {
      label: 'Αριθμός',
      placeholder: '2',
      value: '',
      rules: {
        notEmpty: true,
        numeric: true
      },
      errorMessage: ''
    },
    zipCode: {
      label: 'Ταχ. κώδικας',
      placeholder: '68132',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 10
      },
      errorMessage: ''
    },
    city: {
      label: 'Πόλη',
      placeholder: 'Αλεχανδρούπολη',
      value: '',
      rules: {
        notEmpty: true,
        maxLength: 50
      },
      errorMessage: ''
    },
    country: {
      label: 'Χώρα',
      placeholder: 'Ελλάδα',
      value: 'Ελλάδα',
      rules: {
        notEmpty: true,
        maxLength: 50
      },
      errorMessage: ''
    },
    floor: {
      label: 'Όροφος',
      placeholder: '1',
      value: '',
      rules: {
        notEmpty: true,
        numeric: true
      },
      errorMessage: ''
    }
  };

  const [inputs, setInputs] = useState(initialInputs);

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

      addressesApi.createAddress(data).then(() => {
        props.onSuccess && props.onSuccess();
      });
    }
  };
  const onCancel = () => {
    props.onCancel && props.onCancel();
  };

  return (
    <Form>
      <Row>
        {renderInputs()}
        <Col xs={12} className="text-right">
          <Button className="custom secondary" onClick={onCancel}>
            Άκυρο
          </Button>
          <Button className="custom primary" onClick={onSubmit}>
            Δημιουργία
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

AddressForm.propTypes = {
  cancel: PropTypes.number,
  submit: PropTypes.number,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
};

export default AddressForm;
