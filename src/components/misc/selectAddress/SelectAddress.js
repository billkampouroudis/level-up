import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { Add24 } from '@carbon/icons-react';
import PropTypes from 'prop-types';

// Component
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
import EditAddressModal from '../../modals/address/EditAddressModal';
import SelectAddressModal from '../../modals/address/SelectAddressModal';

// API
import addressesAPI from '../../../api/addresses';

const Products = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isSelectAddressModalOpen, setSelectAddressModalOpen] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState(null);

  const listAddresses = (options = {}) => {
    !options.withoutLoading && setLoading(true);
    addressesAPI.listAddresses().then((res) => {
      const { data } = res;

      const primaryAddress =
        addresses.find((address) => address.primary) || data[0];

      setPrimaryAddress(primaryAddress);
      setAddresses(data);
      !options.withoutLoading && setLoading(false);
    });
  };

  const renderCreateAddressTrigger = (options = {}) => {
    return (
      <EditAddressModal
        onOpen={() => setAddressModalOpen(true)}
        onClose={() => {
          setAddressModalOpen(false);
        }}
        onSuccess={() => {
          listAddresses();
          setAddressModalOpen(false);
        }}
        open={isAddressModalOpen}
        stayAfterAction
        cancelMessage="Ακύρωση"
        confirmMessage="Δημιουργία"
        title="Προσθήκη διεύθυνσης"
        trigger={
          <div className={`text-grey-light link ${options.className}`}>
            <Add24 className="mr-1" />
            <span>Προσθήκη διεύθυνσης</span>
            <br />
          </div>
        }
      />
    );
  };

  const renderAddress = (className) => {
    if (!addresses.length) {
      return renderCreateAddressTrigger();
    }

    const { street, number, zipCode, city } = primaryAddress;
    const primaryAddressFormatted = `${street}, ${number}, ${zipCode}, ${city}`;

    return (
      <>
        <SelectAddressModal
          onOpen={() => setSelectAddressModalOpen(true)}
          onClose={() => {
            setSelectAddressModalOpen(false);
          }}
          onUpdateAddress={() => listAddresses({ withoutLoading: true })}
          onSelectAddress={(data) => {
            setAddresses(data);
            setSelectAddressModalOpen(false);
          }}
          open={isSelectAddressModalOpen}
          title="Επιλογή διεύθυνσης"
          trigger={
            <CustomTextInput
              value={primaryAddressFormatted}
              readOnly
              hideError
              className="cursor-pointer"
            />
          }
          addresses={addresses}
        />
        {renderCreateAddressTrigger({ className: 'text-center' })}
      </>
    );
  };

  useEffect(() => {
    listAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.onValueChange && props.onValueChange(primaryAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryAddress]);

  return loading ? <Loader active inline="centered" /> : renderAddress();
};

Products.propTypes = {
  onValueChange: PropTypes.func
};
export default Products;
