import { WebCache } from '@zdzz/shared';
import { name, version } from '../../package.json';
interface WebCacheEnum {
  Token: string;
}
const webCache = new WebCache<WebCacheEnum>({
  projectName: name,
  projectVersion: version,
});

export function setToken(token: string) {
  webCache.set('Token', token);
}

export function getToken() {
  return webCache.get('Token');
}

export function removeToken() {
  webCache.remove('Token');
}
