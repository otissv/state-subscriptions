import { isEvent } from './isEvent';

describe('isEvent', () => {
  it('should return true if event is a valid string', () => {
    expect(isEvent('event')).toBe(true);
  });

  it('should return false if event is not a valid string', () => {
    expect((isEvent as any)('')).toBe(false);
    expect((isEvent as any)(0)).toBe(false);
    expect((isEvent as any)(1)).toBe(false);
    expect((isEvent as any)(true)).toBe(false);
    expect((isEvent as any)(false)).toBe(false);
    expect((isEvent as any)(Symbol)).toBe(false);
    expect((isEvent as any)()).toBe(false);
    expect((isEvent as any)(null)).toBe(false);
    expect((isEvent as any)(undefined)).toBe(false);
  });
});
