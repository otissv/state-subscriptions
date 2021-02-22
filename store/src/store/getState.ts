import { EventType } from './types.store';

export function getState<State extends Record<string, any>>([event, state]: [
  event: EventType,
  state: State,
]): State {
  return event
    .split('.')
    .reduce(
      (previousValue: State, currentValue: string) =>
        previousValue[currentValue],
      state,
    );
}
