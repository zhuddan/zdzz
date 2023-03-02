import type { CreateAxiosOptions } from '../core/axiosTransform';
import { ContentTypeEnum } from '../types';

export const defaultConfig: Partial<CreateAxiosOptions> = {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  // authentication schemes，e.g: Bearer
  // authenticationScheme: 'Bearer',
  authenticationScheme: '',
  timeout: 10 * 1000,
  // 基础接口地址
  // baseURL: globSetting.apiUrl,

  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 如果是form-data格式
  // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  // 数据处理方式
  // transform: clone(transform),
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'message',
    // 接口地址
    // apiUrl: appConfig.VITE_APP_API_URL,
    // 接口拼接地址
    urlPrefix: '',
    // urlPrefix: appConfig.VITE_APP_API_PREFIX,
    //  是否加入时间戳
    joinTime: true,
    // 忽略重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true,
    // headers 携带 token 的 key
    tokenKey: 'Authorization',
  },
};