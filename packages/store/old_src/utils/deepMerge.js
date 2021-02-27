export function deepMerge(target) {
  const state = { ...target };

  function reducer(target, source) {
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (typeof source[prop] === "function") {
          target[prop] = source[prop](state);
        } else if (
          source[prop] != null &&
          target[prop] &&
          typeof source[prop] === "object"
        ) {
          reducer(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  return (source) => reducer({ ...target }, source);
}
