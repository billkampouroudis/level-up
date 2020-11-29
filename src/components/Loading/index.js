import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import SCSS from '../../assets/styles/_variables.scss';
import PropTypes from 'prop-types';

const Loading = (props) => {
  return (
    <div className={`sweet-loading text-center d-flex align-items-center`}>
      <HashLoader
        size={100}
        color={SCSS.color_primary}
        loading={true}
        css="margin: 0 auto;"
      />
    </div>
  );
};

export default Loading;
