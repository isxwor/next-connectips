export const objectToKeyValueString = (obj: Record<string, string>) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join(',');
