import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { saveAs } from 'file-saver';

import { checkStatus } from '../http/core/checkStatus';
import { blobValidate, tansParams } from './help';

export function download(config: AxiosRequestConfig = {}, downloadOptions: { filename?: string } = {}) {
  return axios({
    ...config,
    transformRequest: [
      (params) => {
        return tansParams(params);
      },
    ],
    responseType: 'blob',
  })
    .then(async (res) => {
      const data = res.data;
      const isBlob = await blobValidate(data);
      if (isBlob) {
        const urlList = config.url?.split('/');
        const extList = config.url?.split('.');
        const urlFileName = urlList && urlList?.length >= 0 ? urlList[urlList?.length - 1] : '';
        const ext = extList && extList?.length >= 0 ? extList[extList?.length - 1] : '';
        const filename = downloadOptions.filename || res.headers['file-name'] || res.headers['download-filename'] || urlFileName || `${Date.now()}.${ext}`;
        const blob = new Blob([data]);
        saveAs(blob, decodeURI(decodeURI(filename)));
      }
      else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        await checkStatus(rspObj.status, rspObj.msg).catch((e) => {
          return Promise.reject(e);
        });
      }
    })
    .catch(async (error) => {
      const { response, code, message } = error || {};

      const msg: string = response?.data?.error?.message ?? '';
      const err: string = error?.toString?.() ?? '';
      let errMessage = '';

      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1)
          errMessage = '接口请求超时,请刷新页面重试!';
        if (err?.includes('Network Error'))
          errMessage = '网络异常，请检查您的网络连接是否正常!';
        if (errMessage)
          return Promise.reject(errMessage);
      }
      catch (error) {
        throw new Error(error as unknown as string);
      }

      await checkStatus(error?.response?.status, msg).catch((e) => {
        return Promise.reject(e);
      });

      return Promise.reject(error);
    });
}
