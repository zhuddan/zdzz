export interface WebCacheTime {
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
}

export interface WebCacheData<T = any> {
  value: T;
  expires: number;
}
