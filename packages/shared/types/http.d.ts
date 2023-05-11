declare type ResponseResult<T> = T & {
  code: number;
  msg?: string;
};

declare type ResponseList<T> = ResponseResult<{
  total: number;
  rows: T[];
}>;

declare type ResponseData<T = any> = ResponseResult<{
  data: T;
}>;

declare type ResponseListParams<T = Recordable> = {
  pageNum: number;
  pageSize: number;
} & T;

declare type ListQuery<T = Recordable> = Partial<ResponseListParams<T>>;
