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
  return defHttp.put<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/captchaImage',
    },
    {
      withToken: false,
    },
  );
}

// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
  return defHttp.post<ResponseResult<{ token: string }>>(
    {
      url: '/login',
      data: {
        username,
        password,
        code,
        uuid,
      },
    },
    {
      withToken: false,
    },
  );
}