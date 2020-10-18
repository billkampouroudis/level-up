import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SCSS from '../../assets/styles/_variables.scss';
import './style.scss';

const CustomNav = (props) => {
  const { loading, fullHeight } = props;

  return loading ? (
    <div
      className={`sweet-loading text-center d-flex align-items-center ${
        fullHeight && loading ? 'full-height' : ''
      } `}
    >
      <HashLoader
        size={100}
        color={SCSS.color_primary}
        loading={loading}
        css="margin: 0 auto;"
      />
    </div>
  ) : null;
};

export default CustomNav;
