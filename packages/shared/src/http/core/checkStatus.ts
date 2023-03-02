// import { useMessage } from '@/hooks/web/useMessage';
// import type { ErrorMessageMode } from './types';
// import { useI18n } from '@/hooks/web/useI18n'
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';
// import { useUserStoreWithOut } from '@/store/modules/user'
// import projectSetting from '@/settings/projectSetting'
// import { SessionTimeoutProcessingEnum } from '@/enums/appEnum'

// const { msgError, createNotification } = useMessage();
// const stp = projectSetting.sessionTimeoutProcessing

export function checkStatus(
  status: number,
  msg: string,
  // errorMessageMode: ErrorMessageMode = 'message',
) {
  // const { t } = useI18n()
  // const userStore = useUserStoreWithOut()
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined)
      // errMessage = msg || t('sys.api.errMsg401')
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   // userStore.setSessionTimeout(true)
      // } else {
      //   // userStore.logout(true)
      // }
      errMessage = '登录状态过期，请重新登录';
      break;
    case 403:
      errMessage = '禁止访问';
      break;
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源!';
      break;
    case 405:
      errMessage = '网络请求错误,请求方法未允许!';
      break;
    case 408:
      errMessage = '网络请求超时!';
      break;
    case 500:
      errMessage = '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = '网络未实现!';
      break;
    case 502:
      errMessage = '网络错误!';
      break;
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!';
      break;
    case 504:
      errMessage = '网络超时!';
      break;
    case 505:
      errMessage = 'http版本不支持该请求!';
      break;
    default:
  }

  return Promise.reject(errMessage);

  // if (errMessage) {
  //   if (errorMessageMode === 'modal') {
  //     console.log(['checkStatus', 'modal']);
  //     createNotification(`checkStatus${errMessage}`);
  //   }
  //   else if (errorMessageMode === 'message') {
  //     console.log(['checkStatus', 'message']);
  //     msgError(`checkStatus${errMessage}`);
  //   }
  //   // createMsg.error({ message: errMessage, key: `global_error_message_status_${status}` });
  // }
}
