import { isObject } from '../is';

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params?: Record<string, any>) {
  if (!isObject(params)) return '';
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}
// 验证是否为blob格式
export async function blobValidate(data: any) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  }
  catch (error) {
    return true;
  }
}
