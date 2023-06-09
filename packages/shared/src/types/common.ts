export type Nullable<T> = T | null;

export type Arrayable<T> = T | T[];

export type Awaitable<T> = Promise<T> | T;

export type Functionable<T> = () => T | T;

export interface AnyObject { [key: string]: any }

export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

export type TreeItem<T extends AnyObject= AnyObject> = T & {
  children?: TreeItem<T>[];
};

export type TreeList<T extends AnyObject= AnyObject> = TreeItem<T>[];

