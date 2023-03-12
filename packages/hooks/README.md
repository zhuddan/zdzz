# vue hooks

业务中常用 vue hooks 函数

1. useContext

```ts
import { InjectionKey, Ref } from "vue";
import { createContext, useContext } from "@zdzz/hooks";

export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
```

2. useEventListener

事件监听器

```js
import { useEventListener } from "@zdzz/hooks";

useEventListener(window, "mousemove", (event) => {
  // ...
});
```

3. useImageViewer

```ts
import { useImageViewer } from "@zdzz/hooks";

const { view } = useImageViewer("a.png");
view();

const { view } = useImageViewer(["a.png", "b.png"]);
view(1);
```

4. useRouteParams

```ts
import { useRouteParams } from "@zdzz/hooks";

const userId = useRouteParams("userId");

const userId = useRouteParams("userId", "-1"); // or with a default value

console.log(userId.value); // route.params.userId

userId.value = "100"; // router.replace({ params: { userId: '100' } })
```

5. useRouteQuery

```ts
import { useRouteQuery } from "@zdzz/hooks";

import { useRouteQuery } from "@vueuse/router";

const search = useRouteQuery("search");

const search = useRouteQuery("search", "foo"); // or with a default value

console.log(search.value); // route.query.search

search.value = "foobar"; // router.replace({ query: { search: 'foobar' } })
```

7. useToggle

```ts
import { useToggle } from "@zdzz/hooks";

const [value, toggle] = useToggle();
```
