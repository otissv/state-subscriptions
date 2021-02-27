export function isEvent(event: string): boolean {
  return typeof event === 'string' && (event as string).trim() !== '';
}
