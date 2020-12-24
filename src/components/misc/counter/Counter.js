import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Subtract32, Add32 } from '@carbon/icons-react';
import { Button } from 'semantic-ui-react';

function Counter(props) {
  const { maxCount, initialCount } = props;
  const [count, setCount] = useState(initialCount || 1);

  const defaultMaxCount = 99;

  const decrease = () => {
    if (count > 1) {
      const _count = count - 1;
      setCount(_count);
      props.onChange(_count);
    }
  };

  const increase = () => {
    if ((maxCount && count < maxCount) || count < defaultMaxCount) {
      const _count = count + 1;
      setCount(_count);
      props.onChange(_count);
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
  maxCount: PropTypes.number,
  onChange: PropTypes.func,
  initialCount: PropTypes.number
};

export default Counter;
