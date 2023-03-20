import { parseJson, stringifyJson } from '../json';
import { isNumber, isObject } from '../is';
import type { WebCacheData, WebCacheTime } from './types';

type ExpiresTime = number | WebCacheTime;
export class WebCache<CacheType extends Recordable> {
  projectName: string;
  projectVersion: string;
  defaultExpires = 864e5 * 7;

  constructor({ projectName, time, projectVersion }: { projectName: string; projectVersion: string; time?: ExpiresTime }) {
    this.projectName = projectName;
    this.projectVersion = projectVersion;
    if (!time) return;
    const t = isObject(time) ? this.formatExpires(time) : time;
    this.defaultExpires = t;
  }

  get perfixKey() {
    return `${this.projectName}_${this.projectVersion}_`;
  }

  getRealKey<K extends keyof CacheType>(key: K) {
    return `${this.perfixKey}${String(key)}`;
  }

  /**
   * @description 获取超时时间
   * @param data
   */
  formatExpires(data: Partial<WebCacheTime> | number): number {
    if (isNumber(data))
      return data;
    const { day, hour, minutes, second } = data;
    const dataDay = (day ? day * 24 : 0) * 864e2;// 秒
    const dataHours = (hour || 0) * 60 * 60;// 秒
    const dataMinutes = (minutes || 0) * 60;// 秒
    const dataSeconds = (second || 0) * 60;// 秒
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000;
  }

  getExpires(expiresTime?: Partial<WebCacheTime> | number): number {
    let expires = this.defaultExpires;
    // 如果 expiresTime == -1 永远不删除
    if (expiresTime == -1)
      expires = Number.MAX_SAFE_INTEGER;

    else if (expiresTime || isObject(expiresTime))
      expires = this.formatExpires(expiresTime);

    return Date.now() + expires;
  }

  set<K extends keyof CacheType>(key: K, value: CacheType[K], options: ExpiresTime = this.defaultExpires) {
    const _key = this.getRealKey(key);
    const data = stringifyJson({
      value,
      expires: this.getExpires(options),
    });
    localStorage.setItem(_key, data);
  }

  get<K extends keyof CacheType>(key: K) {
    const _key = this.getRealKey(key);
    const res = localStorage.getItem(_key);
    if (!res) return null;
    const { expires, value } = parseJson<WebCacheData<CacheType[K]>>(res);
    const now = Date.now();
    if (expires < now) {
      this.remove(key);
      return null;
    }
    return value;
  }

  remove<K extends keyof CacheType>(key: K) {
    const _key = this.getRealKey(key);
    localStorage.removeItem(_key);
  }

  clear() {
    localStorage.clear();
  }
}

