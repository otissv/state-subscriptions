export function deepMerge<T extends Record<string, any>>(
  target: T,
): (source: T) => T {
  const state = { ...target };

  function reducer(target: T, source: T) {
    for (const prop in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(prop)) {
        if (typeof source[prop] === 'function') {
          target[prop] = source[prop](state);
        } else if (
          source[prop] != null &&
          target[prop] &&
          typeof source[prop] === 'object'
        ) {
          reducer(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  return (source: T) => reducer({ ...target }, source);
}
