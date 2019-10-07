export function assert(truthy: any, message: string) {
  if (!truthy) {
    throw new TypeError(message);
  }
}
