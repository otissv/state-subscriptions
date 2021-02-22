/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable no-prototype-builtins */
/* eslint-disable functional/no-loop-statement */

export function deepMerge<T extends Record<string, any>>(
  target: T,
): (source: T) => T {
  const state = { ...target };

  function reducer(target: T, source: T) {
    for (const prop in source) {
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
