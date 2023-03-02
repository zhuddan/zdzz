import { createAxios, createRuoyiAxiosTransform } from '@zdzz/shared';
import { getToken, removeToken } from '../../../utils/cache';

const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  createMessage: alert,
});
export const defHttp = createAxios({
  transform,
  requestOptions: {
    apiUrl: 'http://116.52.144.173:8994',
  },
});

export function getCodeImg() {
  return defHttp.get<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/captchaImage',
    },
    {
      withToken: false,
    },
  );
}