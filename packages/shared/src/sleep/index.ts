export function sleep(t = 1000) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, t);
  });
}
