import { WebCache } from '@zdzz/shared';
import { name, version } from '../../package.json';
type WebCacheEnum = 'Token';
const webCache = new WebCache<WebCacheEnum>({
  projectName: name,
  projectVersion: version,
});

export function setToken(token: string) {
  webCache.set('Token', token);
}

export function getToken() {
  return webCache.get<string>('Token');
}

export function removeToken() {
  webCache.remove('Token');
}
