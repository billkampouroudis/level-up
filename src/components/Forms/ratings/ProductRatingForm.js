import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import get from '../../../utils/misc/get';
import {
  validateAll,
  haveErrors,
  handleOnBlur,
  handleOnKeyUp
} from '../../../utils/validation';

// Components
import { Row, Col } from 'react-bootstrap';
import { Rating, Message, Form, Button } from 'semantic-ui-react';
import CustomTextArea from '../../formElements/textArea/CustomTextArea';

// Redux Actions
import { getUser } from '../../../redux/user/user.actions';

// API
import productRatingsApi from '../../../api/productRatings';

const ProductRatingForm = (props) => {
  let initialInputs = {
    text: {
      label: 'Περιγραφή',
      placeholder: 'Γράψτε μας τη γνώμη σας για το προϊόν',
      value: '',
      rules: {
        maxLength: 500
      },
      errorMessage: ''
    }
  };

  const [stars, setStars] = useState(null);
  const [showStarsError, setShowStarsError] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [formError, setFormError] = useState(false);

  const onSubmit = () => {
    setFormError(false);
    setShowStarsError(false);

    const validatedInputs = validateAll(inputs);
    setInputs(validatedInputs);

    if (!stars) {
      setShowStarsError(true);
      return;
    }

    if (!haveErrors(validatedInputs)) {
      const data = {
        text: inputs.text.value,
        stars,
        productId: get.safe(() => props.product.id)
      };

      productRatingsApi
        .createProductRating(data)
        .then((res) => {
          props.getUser();
          clearInputs();
          props.onSuccess && props.onSuccess();
        })
        .catch(() => {
          setFormError(true);
        });
    }
  };

  const onCancel = () => {
    clearInputs();
    props.onCancel && props.onCancel();
  };

  const clearInputs = () => {
    setInputs(initialInputs);
  };

  const renderInputs = () => {
    return (
      <>
        <Col xs={12} className="mb-3">
          <label>Βαθμολογία</label>
          <div>
            <Rating
              maxRating={5}
              size="massive"
              onRate={(e, { rating }) => setStars(rating)}
            />
            {showStarsError ? (
              <div className="text-danger mt-1">
                Η βαθμολογία είναι υποχρεωτική
              </div>
            ) : null}
          </div>
        </Col>
        <Col className="mb-4">
          <Form.Field>
            <CustomTextArea
              label={inputs.text.label}
              placeholder={inputs.text.placeholder}
              onKeyUp={(e) => setInputs(handleOnKeyUp(e, 'text', inputs))}
              onBlur={(e) => setInputs(handleOnBlur(e, 'text', inputs))}
              defaultValue={inputs.text.value}
              errorMessage={inputs.text.errorMessage}
              name="description"
              rows={4}
            />
          </Form.Field>
        </Col>
      </>
    );
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
    setShowStarsError(false);
  }, [stars]);

  useEffect(() => {
    setInitialInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rerender]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row>{renderInputs()}</Row>
        <Row>
          <Col>
            <div className="d-sm-flex flex-sm-row-reverse">
              <Button className="custom primary" type="submit">
                {props.submitText || 'Αποθήκευση'}
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
      {formError && (
        <Message
          negative
          content={'Η κριτική σας δεν αποθηκεύτικε με επιτυχία.'}
          onDismiss={() => setFormError(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser.call())
  };
};

ProductRatingForm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  address: PropTypes.object,
  index: PropTypes.number,
  rerender: PropTypes.any,
  product: PropTypes.object.isRequired,
  getUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingForm);
