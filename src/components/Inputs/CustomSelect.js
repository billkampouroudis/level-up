import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const CustomSelect = (props) => {
  return (
    <>
      <Select
        placeholder={props.placeholder || ''}
        options={props.options}
        onChange={(e, { value }) => props.onChange(e, value)}
      />
      <span className="error-message">{props.errorMessage || '\u00a0'}</span>
    </>
  );
};

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
export default CustomSelect;
