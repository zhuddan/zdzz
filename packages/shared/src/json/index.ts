export function stringifyJson(data: Recordable): Nullable<string> {
  try {
    return JSON.stringify(data);
  }
  catch (error) {
    return null;
  }
}

export function parseJson<T extends Recordable = Recordable>(jsonStr: string): Nullable<T> {
  try {
    return JSON.parse(jsonStr);
  }
  catch (error) {
    return null;
  }
}
