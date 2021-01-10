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
        className="mb-1"
        src={props.img}
        alt="Δεν υπάρχουν κριτικές για το προϊόν"
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
  img: PropTypes.object.isRequired,
  description: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object
};

export default Illustration;
