export function isEvent(event: string) {
  return typeof event === 'string' && (event as string).trim() !== '';
}
