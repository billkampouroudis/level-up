import React, { useState } from 'react';
import { PAYMENT_COD } from '../../../constants';
// Components
import { Radio } from 'semantic-ui-react';

const SelectPaymentMethod = (props) => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_COD);

  const handlePaymentMethodChange = (e, { value }) => {
    setPaymentMethod(value);
  };

  const renderPaymentMethodsList = () => {
    return (
      <Radio
        label={PAYMENT_COD}
        name="paymentMethods"
        value={PAYMENT_COD}
        checked={paymentMethod === PAYMENT_COD}
        onChange={handlePaymentMethodChange}
      />
    );
  };

  return renderPaymentMethodsList();
};

export default SelectPaymentMethod;
