export interface WebCacheTime {
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
}

export interface WebCacheData {
  value: any;
  expires: number;
}
