/**
 * @param baseUrl url
 * @param params
 * @returns {string}
 */
export function setParams(baseUrl: string, params: Recordable): string {
  let parameters = '';
  for (const key in params)
    parameters += `${key}=${encodeURIComponent(params[key])}&`;

  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
