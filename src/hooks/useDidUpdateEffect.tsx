import { useRef, useEffect } from 'react';

export const useDidUpdateEffect = (fn: any, inp: any[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inp);
};