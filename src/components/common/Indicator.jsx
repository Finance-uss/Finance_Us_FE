import React from 'react';
import indicatorImage from '../../assets/icons/indicator/Indicator_black.svg';

const Indicator = () => {
  return (
    <img
      src={indicatorImage}
      alt="Indicator"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default Indicator;
