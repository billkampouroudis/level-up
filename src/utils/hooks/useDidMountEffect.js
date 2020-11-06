/**
 * This can be used as the useEffect hook but, it will not run on the first page render
 */
import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useDidMountEffect;
