export type ResponseResult<T> = T & {
  code: number;
  msg?: string;
};

export type ResponseList<T> = ResponseResult<{
  total: number;
  rows: T[];
}>;

export type ResponseData<T = any> = ResponseResult<{
  data: T;
}>;

export interface ResponseListParams {
  pageNum: number;
  pageSize: number;
}

export type ResponseListParamsWrapper<T extends object = object> = ResponseListParams & Partial<T>;

export type ResponseListParamsWrapperPartial<T extends object = object> = Partial<ResponseListParams & T>;

export type ListQuery<T extends object = object> = ResponseListParams
| ResponseListParamsWrapper<T>
| ResponseListParamsWrapper<T>
| Partial<T>;

