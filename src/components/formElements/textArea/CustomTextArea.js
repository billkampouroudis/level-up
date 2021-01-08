import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

const CustomTextArea = (props) => {
  const { label, errorMessage } = props;

  const propsToAdd = () => {
    const propsToHide = ['label', 'errorMessage', 'hideError'];
    const _props = { ...props };

    for (let prop of propsToHide) {
      delete _props[prop];
    }

    if (errorMessage) {
      _props.error = errorMessage;
    }

    return _props;
  };

  return (
    <div className="mb-2">
      {label && <label className="mb-1 ml-1">{label}</label>}
      <TextArea {...propsToAdd()} />
      {!props.hideError && (
        <span className="error-message ml-1">{errorMessage}</span>
      )}
    </div>
  );
};

CustomTextArea.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  hideError: PropTypes.bool
};
export default CustomTextArea;
