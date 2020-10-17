import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SCSS from '../../assets/styles/_variables.scss';

const CustomNav = (props) => {
  return (
    <div className="sweet-loading text-center">
      <HashLoader
        size={100}
        color={SCSS.color_primary}
        loading={props.loading}
        css="margin: 0 auto;"
      />
    </div>
  );
};

export default CustomNav;
