import type { AlertOptions } from 'notie';
import { alert } from 'notie';
import './notie.scss';

type MsgOptions = Omit<AlertOptions, 'text'>;
type MsgOptionsWithoutType = Omit<MsgOptions, 'type'>;
export function useMessage() {
  function createMsg(text: string, msgOptions: MsgOptions = {}) {
    alert({
      text,
      ...msgOptions,
    });
  }
  function createErrorMsg(text: string, msgOptions: MsgOptionsWithoutType = {}) {
    alert({
      text,
      ...msgOptions,
      type: 'error',
    });
  }
  function createSuccessMsg(text: string, msgOptions: MsgOptionsWithoutType = {}) {
    alert({
      text,
      ...msgOptions,
      type: 'success',
    });
  }

  function createWarningMsg(text: string, msgOptions: MsgOptionsWithoutType = {}) {
    alert({
      text,
      ...msgOptions,
      type: 'warning',
    });
  }
  function createInfoMsg(text: string, msgOptions: MsgOptionsWithoutType = {}) {
    alert({
      text,
      ...msgOptions,
      type: 'info',
    });
  }
  return {
    createErrorMsg,
    createSuccessMsg,
    createWarningMsg,
    createInfoMsg,
    createMsg,
  };
}