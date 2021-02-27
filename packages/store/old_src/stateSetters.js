export const updateOrderSetter = (update) => {
  return () => ({
    order: {
      ...update,
    },
  });
};

export function insertState(list = []) {
  return (n = list.length) => (update) => {
    if (n === 0) {
      return [update, ...list];
    } else if (n === list.length) {
      return [...list, update];
    } else {
      return [...list.slice(0, n), update, ...list.slice(n, list.length)];
    }
  };
}

export function updateState(list = []) {
  return (n = list.length) => (update) => {
    if (n === 0) {
      return [update, ...list.slice(1, list.length)];
    } else if (n === list.length) {
      return [...list.slice(0, list.length - 1), update];
    } else {
      return [...list.slice(0, n), update, ...list.slice(n, list.length - 1)];
    }
  };
}
