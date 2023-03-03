import type { AxiosResponse } from 'axios';
import { RequestEnum, ResultEnum } from '../types/enum';
import { isString } from '../../is';
import type { RequestOptions, Result } from '../types';
import type { AxiosTransform, CreateAxiosTransform } from '../core/axiosTransform';
import { checkStatus } from '../core/checkStatus';
import { formatRequestDate, joinTimestamp } from '../core/helper';
import { setObjToUrlParams } from '../utils';

export const createRuoyiAxiosTransform: CreateAxiosTransform = ({ createMessage, getToken, removeToken, signoutHandler }) => {
  const transform: AxiosTransform = {
    /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
    transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
      // const { t } = useI18n();
      const { isTransformResponse, isReturnNativeResponse } = options;
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse)
        return res;

      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse)
        return res.data;

      // 错误的时候返回

      const { data } = res;
      if (!data) {
        // return '[HTTP] Request has no return value';
        throw new Error('请求出错，请稍候重试');
      }
      //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
      const { code, msg } = data;

      // 这里逻辑可以根据项目进行修改
      const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
      if (hasSuccess)
        return data;

      // 在此处根据自己项目的实际情况对不同的code执行不同的操作
      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      let errorMsg = '';
      // const userStore = useUserStore();
      switch (code) {
        case ResultEnum.TIMEOUT:
          errorMsg = '登录超时,请重新登录!';
          signoutHandler?.();
          removeToken?.();
          break;
        default:
          if (msg)
            errorMsg = msg;
          else
            errorMsg = '未知错误';
      }

      createMessage(options.errorMessageMode, errorMsg);
      throw new Error(errorMsg || '请求出错，请稍候重试');
    },

    // 请求之前处理config
    beforeRequestHook: (config, options) => {
      const { apiUrl = '', joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

      if (joinPrefix && isString(urlPrefix))
        config.url = `${urlPrefix}${config.url}`;

      if (apiUrl && isString(apiUrl))
        config.url = `${apiUrl}${config.url}`;
      const params = config.params || {};
      const data = config.data || false;
      formatDate && data && !isString(data) && formatRequestDate(data);
      if (config.method?.toUpperCase() === RequestEnum.GET) {
        if (!isString(params)) {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
        }
        else {
          // 兼容restful风格
          config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`;
          config.params = undefined;
        }
      }
      else {
        if (!isString(params)) {
          formatDate && formatRequestDate(params);
          if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
            config.data = data;
            config.params = params;
          }
          else {
            // 非GET请求如果没有提供data，则将params视为data
            config.data = params;
            config.params = undefined;
          }
          if (joinParamsToUrl)
            config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
        else {
          // 兼容restful风格
          config.url = config.url + params;
          config.params = undefined;
        }
      }
      return config;
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config, options) => {
      // 请求之前处理config
      const token = getToken();
      if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
        // jwt token
        const tokenKey = options.requestOptions?.tokenKey as string;
        (config as Recordable).headers[tokenKey] = options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token;
      }
      return config;
    },

    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res: AxiosResponse<any>) => {
      return res;
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
      const { response, code, message, config } = error || {};
      const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
      const msg: string = response?.data?.error?.message ?? '';
      const err: string = error?.toString?.() ?? '';
      let errMessage = '';

      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1)
          errMessage = '接口请求超时,请刷新页面重试!';

        if (err?.includes('Network Error'))
          errMessage = '网络异常，请检查您的网络连接是否正常!';
        if (errMessage) {
          createMessage(errorMessageMode, errMessage);
          return Promise.reject(error);
        }
      }
      catch (error) {
        throw new Error(error as unknown as string);
      }
      checkStatus(error?.response?.status, msg).catch((e) => {
        createMessage(errorMessageMode, e);
      });

      return Promise.reject(error);
    },
  };

  return transform;
};