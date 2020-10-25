import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const ErrorAlert = (props) => {
  const { title, message } = props;

  return (
    <Message negative>
      <Message.Header>{title || 'Σφάλμα'}</Message.Header>
      <p>{message || 'Προσπαθήστε ξανά αργότερα'}</p>
    </Message>
  );
};

ErrorAlert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default ErrorAlert;
