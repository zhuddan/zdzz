import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

import { isFunction } from '../../is';

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  pendingMap = new Map<string, Canceler>();
  constructor() {}
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken
      = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) {
          // If there is no current request in pending, add it
          this.pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    this.pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    this.pendingMap.clear();
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (this.pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = this.pendingMap.get(url);
      cancel && cancel(url);
      this.pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    this.pendingMap = new Map<string, Canceler>();
  }
}
