import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Subtract32, Add32 } from '@carbon/icons-react';
import { Button } from 'semantic-ui-react';

function Counter(props) {
  const { maxCount } = props;
  const [count, setCount] = useState(1);

  const defaultMaxCount = 99;

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    if ((maxCount && count < maxCount) || count < defaultMaxCount) {
      setCount(count + 1);
    }
  };

  return (
    <div className="counter">
      <Button circular className="p-0 m-0">
        <Subtract32 onClick={decrease} className="counter-icons" />
      </Button>
      <span
        className="mx-2 text-center d-inline-block"
        style={{ width: '24px' }}
      >
        {count}
      </span>
      <Button circular className="p-0 m-0">
        <Add32 onClick={increase} className="counter-icons" />
      </Button>
    </div>
  );
}

Counter.propTypes = {
  maxCount: PropTypes.number
};

export default Counter;
