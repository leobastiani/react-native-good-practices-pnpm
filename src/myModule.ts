import {memoize} from 'lodash';

export const myMemoized = memoize((num, sideEffect: () => void) => {
  sideEffect();
  return num + 1;
});

export const myFunction = () => 'myReturn';
