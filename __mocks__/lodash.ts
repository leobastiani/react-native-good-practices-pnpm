const lodash: typeof import('lodash') = jest.requireActual('lodash');

const memoizeds = new Set<ReturnType<typeof lodash.memoize>>();

afterEach(() => {
  memoizeds.forEach(memoized => memoized.cache.clear?.());
  memoizeds.clear();
});

lodash.memoize = new Proxy(lodash.memoize, {
  apply(target, thisArgs, [factory, ...restArgs]) {
    const retMemoize = Reflect.apply(target, thisArgs, [
      new Proxy(factory, {
        apply(factoryTarget, factoryThisArgs, factoryArgs) {
          memoizeds.add(retMemoize);
          return Reflect.apply(factoryTarget, factoryThisArgs, factoryArgs);
        },
      }),
      ...restArgs,
    ]);
    memoizeds.add(retMemoize);
    return retMemoize;
  },
});

module.exports = lodash;
