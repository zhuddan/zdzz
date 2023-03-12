# 共享工具类

一个共享工具类包，包含了常见的数据类型判断、工具函数、业务工具

## 基础工具

1. 数据类型判断

| 方法                     | 描述                                   | 备注                                                                              |
| ------------------------ | -------------------------------------- | --------------------------------------------------------------------------------- |
| `isUnDef(val:any) `      | 判断一个值是否是 `undefined`           |                                                                                   |
| `isObject(val:any)`      | 判断一个值是否是 `object`              |                                                                                   |
| `isObject(val:any)`      | 判断一个值是否是 `空`                  | `Array`/`String` 的`length` 或 `Map`/`Set`的`size` 或者 `object`的`keys` 不能为 0 |
| `isDate(val:any)`        | 判断一个值是否是 `date`                |                                                                                   |
| `isNull(val:any)`        | 判断一个值是否是 `null`                |                                                                                   |
| `isNullOrUnDef(val:any)` | 判断一个值是否是 `null` 或 `undefined` |                                                                                   |
| `isNumber(val:any)`      | 判断一个值是否是 `number`              |                                                                                   |
| `isPromise(val:any)`     | 判断一个值是否是 `promise`             |                                                                                   |
| `isString(val:any)`      | 判断一个值是否是 `string`              |                                                                                   |
| `isFunction(val:any)`    | 判断一个值是否是 `function`            |                                                                                   |
| `isBoolean(val:any)`     | 判断一个值是否是 `boolean`             |                                                                                   |
| `isRegExp(val:any)`      | 判断一个值是否是 `RegExp`              |                                                                                   |
| `isArray(val:any)`       | 判断一个值是否是 `Array`               |                                                                                   |
| `isWindow(val:any)`      | 判断一个值是否是 `Window`              |                                                                                   |
| `isElement(val:any)`     | 判断一个值是否是 `Element`             |                                                                                   |
| `isMap(val:any)`         | 判断一个值是否是 `Map`                 |                                                                                   |
| `isServer`               | 是否是服务端                           | `typeof window === 'undefined'`                                                   |
| `isClient`               | 是否是客户端                           |                                                                                   |
| `isLink`                 | 是否是一个连接                         |                                                                                   |

2. 常用工具类

| 方法                                                                | 描述                   | 备注                                                                                          |
| ------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `browser`                                                           | 判断浏览器内核         | `IsPC` `isIE` `isIE9` `isEdge` `isAndroid` `isIOS` `isChrome` `isPhantomJS` `isFF` `isSafari` |
| `capitalize(str: string, strict = true)`                            | 字符串首字母大写       | `capitalize('userName') ==> 'Username'` `capitalize('userName',false) ==> 'UserName'`         |
| `cloneDeep`                                                         | 深度克隆               |                                                                                               |
| `createUuid():string`                                               | 创建一个 uuid          |                                                                                               |
| `formatDirection(_azimuth?: number):string`                         | 转换方位角             | `formatDirection(0)==>'正北' `                                                                |
| `formatSize(limit?: number):string`                                 | 转化文件大小           | `formatSize(1024)==>'1Kb' `                                                                   |
| `getParams(url?: string):Record<string,any>`                        | 获取参数               | `getParams(?a=1&b=2)==>'{a:'1',b:'2'}'`                                                       |
| `listToTree<T>(data: TreeItem<T>[], options?:Options): TreeList<T>` | 普通列表转化为树形列表 | `Options: Partial<{id: string; parentId: string; children: string;  withLevel: boolean;}>`    |
| `merge`                                                             | 深度合并对象           |                                                                                               |
| `setParams(baseUrl: string, params: Recordable): string`            | 参数添加到 url         | `setParams('www.a.com',{type:123}) ===> 'www.a.com?type=123'`                                 |
| `sleep(t = 1000):Promise<void>`                                     | setTimeout             |                                                                                               |
| `validate`                                                          | 常见校验               | `validURL` `validLowerCase` `validUpperCase` `validAlphabets` `validEmail` `validPhone`       |
| `withInstall`                                                       | vue 组件 install 方法  |                                                                                               |

## 业务相关

1. cache

```ts
import { WebCache } from "@zdzz/shared";
import { name, version } from "../../package.json";
type WebCacheEnum = "Token";
const webCache = new WebCache<WebCacheEnum>({
  projectName: name,
  projectVersion: version,
});

export function setToken(token: string) {
  webCache.set("Token", token);
}

export function getToken() {
  return webCache.get<string>("Token");
}

export function removeToken() {
  webCache.remove("Token");
}
```

2. http

```ts
import { createAxios, createRuoyiAxiosTransform } from "@zdzz/shared";
import { getToken, removeToken } from "@/utils/cache";
import { useMessage } from "@/hooks/useMessage";
const apiUrl = "***";

const { createErrorMsg } = useMessage();
const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  createMessage: (a, b) => createErrorMsg(b),
});
export const defHttp = createAxios(apiUrl, { transform });
```

3. dict

```ts
import type {
  DictBaseOptions,
  DictDataListRecord,
  DictDataLoadingRecord,
  LoadDict,
  OriginDictData,
} from "@zdzz/shared";
import { computed, toRefs, unref } from "vue";
import { defHttp } from "@/utils/defHttp";
import { Dict } from "@zdzz/shared";
export type DictTypes =
  | "sys_user_sex"
  | "sys_normal_disable"
  | "sys_notice_type";

const getDicts: LoadDict<DictTypes> = (dictType) => {
  return new Promise<OriginDictData[]>((resolve, reject) => {
    defHttp
      .get<ResponseData<OriginDictData[]>>(
        {
          url: `/api/sys/type/${dictType}`,
        },
        {
          withToken: false,
          ignoreCancelToken: true,
        }
      )
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`
          );
        } else {
          resolve(res.data);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};
interface BaseDicts<DT extends string, F, L> {
  dicts: DictDataListRecord<DT>;
  dictsLoading: DictDataLoadingRecord<DT>;
  format: F; // typeof format;
  load: L; // typeof load;
}
export function useDicts<DT extends DictTypes = DictTypes>(
  dts: DT[],
  options: Partial<DictBaseOptions> = {}
) {
  const dict = new Dict<DT>(dts, getDicts, options);
  // debug
  Dict.debug = true;
  const format = dict.format.bind(dict);
  const load = dict.load.bind(dict);
  const dicts = computed(() => dict.data.value);
  const dictsLoading = computed(() => dict.loading.value);
  const useRuoyiDictsReturn = {
    format,
    load,
    dicts,
    dictsLoading,
    ...toRefs(unref(dict.data)),
    ...toRefs(unref(dict.loading)),
  };

  type UseRuoyiDictsReturn = RecordRef<DictDataListRecord<DT>> &
    RecordRef<DictDataLoadingRecord<DT>> &
    BaseDicts<DT, typeof format, typeof load>;
  return useRuoyiDictsReturn as unknown as UseRuoyiDictsReturn;
}
```
