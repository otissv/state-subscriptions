export function pipe(...fns) {
  return (value) => {
    return fns.length === 0
      ? value
      : pipe(...fns.slice(1, fns.length))(fns[0](value));
  };
}
