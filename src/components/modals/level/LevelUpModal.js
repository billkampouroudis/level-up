import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomModal from '../CustomModal';

// Images
import LevelUpIl from '../../../assets/illustrations/Level-up.svg';

const LevelUpModal = (props) => {
  const { newLevel } = props;

  return (
    <CustomModal {...props}>
      <p className="text-xl mb-0">
        Μόλις ξεκλειδώσατε όλες τις προσφορές που ανήκουν στο{' '}
        <strong>level {newLevel}</strong>.
      </p>

      <div className="level-up-il-container my-4">
        <img src={LevelUpIl} alt="Level up" />
        <span>Level {newLevel}</span>
      </div>

      <p>
        Πλέον μπορείτε να αγοράζετε τα αγαπημένα σας προϊόντα με την ένδειξή{' '}
        <img
          src={`/icons/levels/Unlocked-${newLevel}.svg`}
          alt={`Level ${newLevel} discount`}
          className="pb-1"
        />{' '}
        σε χαμηλώτερη τιμή.
      </p>
    </CustomModal>
  );
};

LevelUpModal.propTypes = {
  onClose: PropTypes.func,
  newLevel: PropTypes.number.isRequired
};

export default LevelUpModal;
