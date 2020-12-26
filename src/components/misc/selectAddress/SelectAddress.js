import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Loader } from 'semantic-ui-react';
import { Add24 } from '@carbon/icons-react';

// Component
import CustomTextInput from '../../formElements/textInput/CustomTextInput';
import AddressModal from '../../modals/address/AddressModal';

// API
import addressesAPI from '../../../api/addresses';

const Products = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    addressesAPI.listAddresses().then((res) => {
      setAddresses(res.data);
      setLoading(false);
    });
  }, []);

  const renderAddress = () => {
    if (!addresses.length) {
      return null;
    }

    // const primaryAddress = addresses.find((address) => address.primary);
    const primaryAddress = addresses[0];
    const { street, number, zipCode, city } = primaryAddress;
    const primaryAddressFormatted = `${street}, ${number}, ${zipCode}, ${city}`;

    if (primaryAddress) {
      return (
        <>
          <CustomTextInput
            value={primaryAddressFormatted}
            readOnly
            hideError
            className="cursor-pointer"
            onClick={() => alert()}
          />
          <AddressModal
            onOpen={() => setIsAddressModalOpen(true)}
            onClose={() => setIsAddressModalOpen(false)}
            stayAfterAction
            open={isAddressModalOpen}
            cancelMessage="Ακύρωση"
            confirmMessage="Δημιουργία"
            title="Προσθήκη διεύθυνσης"
            trigger={
              <div className="text-center text-grey-light link">
                <Add24 className="mr-1" />
                <span>Προσθήκη διεύθυνσης</span>
                <br />
              </div>
            }
          />
        </>
      );
    }
    return null;
  };

  return loading ? <Loader active inline="centered" /> : renderAddress();
};

Products.propTypes = {};
export default Products;
