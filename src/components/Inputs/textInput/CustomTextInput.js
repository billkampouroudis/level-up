import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const CustomTextInput = (props) => {
  const { label, errorMessage } = props;

  const propsToAdd = () => {
    const propsToHide = ['label'];
    const _props = { ...props };

    for (let prop of propsToHide) {
      delete _props[prop];
    }
    console.log(_props);

    return _props;
  };

  return (
    <div className="mb-2">
      {label && <label className="mb-1 ml-1">{label}</label>}
      <Input {...propsToAdd()} />
      <span className="error-message ml-1">{errorMessage}</span>
    </div>
  );
};

CustomTextInput.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string
};
export default CustomTextInput;
