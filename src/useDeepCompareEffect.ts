import { useRef, useEffect, EffectCallback, DependencyList } from 'react';
import * as isEqual from 'react-fast-compare';

const isPrimitive = (val: any) => val !== Object(val)

const useDeepCompareEffect = (effect: EffectCallback, deps: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      throw new Error(
        'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
      )
    }

    if (deps.every(isPrimitive)) {
      throw new Error(
        'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
      );
    }
  }

  const ref = useRef<DependencyList | undefined>(undefined);

  if (!isEqual(deps, ref.current)) {
    ref.current = deps
  }

  useEffect(effect, ref.current)
}

export default useDeepCompareEffect