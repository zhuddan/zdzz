import { createAxios, createRuoyiAxiosTransform } from '@zdzz/shared';
import { getToken, removeToken } from '../../../utils/cache';
import { useMessage } from '../../../hooks/useMessage';
const apiUrl = 'http://116.52.144.173:8994';

const { createErrorMsg } = useMessage();
const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  createMessage: (a, b) => createErrorMsg(b),
});
export const defHttp = createAxios({
  transform,
  requestOptions: {
    apiUrl,
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