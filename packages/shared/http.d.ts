export {};
declare global {
  /**
   * @description 请求响应
   */

  declare type ResponseResult<T> = T & {
    code: number;
    msg?: string;
  };

  declare type ListData<T> = ResponseResult<{
    total: number;
    rows: T[];
  }>;

  declare type ResponseData<T = any> = ResponseResult<{
    data: T;
  }>;

  declare type ListParams<T = object> = {
    pageNum: number;
    pageSize: number;
  } & Partial<T>;

  declare type ListQuery<T = Recordable> = ListParams & Partial<T>;
}