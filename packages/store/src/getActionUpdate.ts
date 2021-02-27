import { pipe } from './utils/pipe';
import { ActionType } from './types.store';

export function getActionUpdate<State>(
  actions: State | ActionType<State, State> | ActionType<State, State>[],
) {
  return (state: Partial<State>): State => {
    switch (true) {
      case Array.isArray(actions):
        return pipe<State>(...(actions as ActionType<State, State>[]))(state);
      case typeof actions === 'function':
        return (actions as ActionType<State, State>)(state as State);
      default:
        return actions as State;
    }
  };
}
