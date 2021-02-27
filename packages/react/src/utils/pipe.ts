/**
 * Evaluates functions in a left to right sequence. Where the return value of the previous function become the argument of the next function in the sequence
 *
 * @param   fns - Functions to be evaluated.
 * @returns Return a function that takes a single argument that will be mapped over.
 *
 * @usage
 * `import \{ pipe \} from "ufunc/pipe"`
 *
 * @example
 * ```
 * const toUpper = (string: string) => string.toUpperCase();
 * const toSnake = (string: string) => string.replace(' ', '_');
 *
 * pipe(toUpper, toSnake)('Hello World!') // "HELLO_WORLD!"
 * ```
 */
export function pipe<To>(
  ...fns: readonly Function[]
): <From>(value: From) => To {
  return <From>(value: From): any =>
    fns.length === 0 ? value : pipe(...fns.slice(1, fns.length))(fns[0](value))
}
