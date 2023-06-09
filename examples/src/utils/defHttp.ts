import { createAxios, createRuoyiAxiosTransform } from '@zdzz/shared';
import { getToken, removeToken } from '@/utils/cache';
import { useMessage } from '@/hooks/useMessage';
const apiUrl = 'http://116.52.144.173:8994';

const { createErrorMsg } = useMessage();
const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  onError: (a, b) => createErrorMsg(b),
});
export const defHttp = createAxios(apiUrl, { transform });
