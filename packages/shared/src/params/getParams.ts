export function getParams(url?: string) {
  const _url = url || window.location.href;
  const [, search] = _url.split('?');
  if (search && search.length) {
    const paramsList = search.split('&');
    const params = {} as Record<string, any>;
    paramsList.forEach((e) => {
      const [key, value] = e.split('=');
      if (value != undefined && value != '')
        params[key] = value;
    });
    return params;
  }
  return {};
}
