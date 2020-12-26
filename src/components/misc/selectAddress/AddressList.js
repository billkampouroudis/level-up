import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Edit24 } from '@carbon/icons-react';

// Component
import AddressForm from '../../forms/address/AddressForm';

// API
import addressesAPI from '../../../api/addresses';

const Products = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    const _activeIndex = activeIndex === index ? -1 : index;
    setActiveIndex(_activeIndex);
  };

  const selectAddress = (index) => {
    const data = {
      newPrimaryAddressId: props.addresses[index].id
    };

    addressesAPI
      .setPrimaryAddress(data)
      .then((res) => props.onUpdateAddress && props.onSelectAddress(res.data));
  };

  const onUpdateAddress = (index) => {
    handleClick(index);
    props.onUpdateAddress && props.onUpdateAddress();
  };

  const renderAddresses = () => {
    return props.addresses
      ? props.addresses.map((address, index) => {
          const { street, number, zipCode, city } = address;
          const addressFormatted = `${street}, ${number}, ${zipCode}, ${city}`;
          return (
            <div className="shadow-filter bg-white p-3 mb-2" key={index}>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                className={`d-flex justify-content-between align-items-center p-0 ${
                  activeIndex === index ? 'mb-2' : null
                }`}
              >
                <span className="w-100" onClick={() => selectAddress(index)}>
                  {addressFormatted}
                </span>
                <span
                  onClick={() => {
                    if (activeIndex < 0) {
                      handleClick(index);
                    }
                  }}
                >
                  {activeIndex !== index ? (
                    <Edit24 className={activeIndex >= 0 ? 'disabled' : null} />
                  ) : null}
                </span>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <AddressForm
                  submitText="Αποθήκευση"
                  address={address}
                  index={index}
                  rerender={activeIndex === index}
                  onCancel={() => handleClick(index)}
                  onSuccess={() => onUpdateAddress(index)}
                />
              </Accordion.Content>
            </div>
          );
        })
      : null;
  };

  return <Accordion fluid>{renderAddresses()}</Accordion>;
};

Products.propTypes = {
  addresses: PropTypes.array,
  onUpdateAddress: PropTypes.func,
  onSelectAddress: PropTypes.func
};
export default Products;
