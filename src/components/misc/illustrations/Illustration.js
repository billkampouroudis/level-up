import React from 'react';
import PropTypes from 'prop-types';

const Illustration = (props) => {
  const customStyle = {
    width: props.width,
    ...props.style
  };

  return (
    <figure className={props.className}>
      <img
        style={customStyle}
        className={`mb-1 ${props.imageClassName ? props.imageClassName : ''}`}
        src={props.img}
        alt={props.alt || ''}
      />
      {props.description ? (
        <div className=" text-muted">{props.description}</div>
      ) : null}
    </figure>
  );
};

Illustration.defaultProps = {
  width: '180px'
};

Illustration.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  description: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  alt: PropTypes.string,
  imageClassName: PropTypes.string
};

export default Illustration;
