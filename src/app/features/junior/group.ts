export function getLastNestedValue(obj: any) {
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return obj;

  const keys = Object.keys(obj);
  const lastKey = keys[keys.length - 1];
  const lastValue = obj[lastKey];

  return getLastNestedValue(lastValue);
}
