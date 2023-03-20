export function stringifyJson(data: Recordable): string {
  try {
    return JSON.stringify(data);
  }
  catch (error) {
    throw new Error(error as any);
  }
}

export function parseJson<T extends Recordable = Recordable>(jsonStr: string): T {
  try {
    return JSON.parse(jsonStr);
  }
  catch (error) {
    throw new Error(error as any);
  }
}
