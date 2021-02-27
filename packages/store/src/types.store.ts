export type EventType = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateInterface extends Record<string, any> {}

export type ActionType<From, To> = (state: From) => To;
