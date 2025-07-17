---
title: Hooks · useRequest
layout: blog
---

# {{ $frontmatter.title }}

<script setup>
import Demo from '@/components/ReactWrap/index.vue'
import NormalWithoutAnyLibs from './demo/index.jsx'
import NormalWithoutAnyLibsOptimize from './demo/optimize.jsx'
import NormalWithoutAnyLibsOptimizeFetch from './demo/optimize-fetch.jsx'
import NormalWithoutAnyLibsOptimizeHook from './demo/optimize-hook.jsx'
import NormalWithoutAnyLibsOptimizeHookFinal from './demo/optimize-hook-final.jsx'
</script>

## 起因

在自身使用 `React` 实现业务逻辑的时候，经常会遇到组件内部请求数据的场景，如果不依赖第三方我们一般会使用如下代码:

::: code-group

<<< ./demo/index.jsx

:::

### 结果展示

<Demo :component="NormalWithoutAnyLibs"/>

但是以上例子会存在内存泄露的风险， `5-6` 行当因为组件销毁的情况发生时，例如马上跳转了其它页面，因为闭包原因，你会发现它仍然会执行。此处你可以尝试多点击几次 `refresh` 按钮，来复现这种情况。

```js {5-6,9-10}
useEffect(() => {
  setLoading(true)
  ajaxData()
    .then((res) => {
      setData(res.data)
      console.log(res)
    })
    .finally(() => {
      console.log('finally')
      setLoading(false)
    })
}, [])
```

针对以上情况，优化方案如下

- 监听组件被移除状态，如果为移除状态，则不进行之后的操作
- 终止 Promise 相关操作

同时在代码复用层面，以上也可以进行优化，毕竟大家也不想每个组件内部的请求都重复以上的逻辑，因此当以上优化处理后，可以增加自定义 hooks 进行包装.

- 封装自定义 hooks，复用以上逻辑

## 优化

我门首先增加组件销毁的状态判断，代码如下：

::: code-group

<<< ./demo/optimize.jsx

:::

### 结果展示

<Demo :component="NormalWithoutAnyLibsOptimize"/>

以上代码当当组件销毁后，不会再执行回掉中的操作，避免了内存溢出的风险。让我门再进一步，将接口请求也取消试试，代码如下：

::: code-group

<<< ./demo/optimize-fetch.jsx

:::

### 结果展示

<Demo :component="NormalWithoutAnyLibsOptimizeFetch"/>

以上代同时当组件销毁的时候，取消了相关的`web`请求操作，同时又增加了销毁判断，减少闭包导致的内存溢出风险。

## 封装成 hook

接下来，我们一起将此功能进行封装，复用下相关逻辑，代码如下：

::: code-group

<<< ./demo/optimize-hook.jsx

<<< ./demo/useRequest.js

:::

### 结果展示

<Demo :component="NormalWithoutAnyLibsOptimizeHook"/>

### 再优化一点

以上`hook`使用，缺少参数传递，我们把这个加上，当前函数签名如下:

```js
function useRequest<TBody>(
  service: Promise<TBody>,
  params?: Record<string, any>
): { loading: boolean, data: TBody }
```

具体实现如下，其中加入了以下功能：

- `params` 改动会自动进行数据重新请求
- `params` 进行了深度比较优化，优化触发频率
  <!-- - 需要 缓存当前 `params` 和 上一次 `params`, 即缓存 当前 `props` 和 上一次 `props` -->
  <!-- - `params` 会进行深度比较，函数 `copy` 自 `react-fast-compare` 库, 不同再进行请求 -->

::: code-group

<<< ./demo/optimize-hook-final.jsx{7-11}

<<< ./demo/useRequestFinal.js

:::

### 结果展示

<Demo :component="NormalWithoutAnyLibsOptimizeHookFinal"/>

## 总结

以上是简易实现 `useRequest` 的一种方式，有如下功能

- 内置优化处理内存溢出问题，约定并且实现 `web` 请求自动取消 方式.
- 按需请求，参数不一致才会进行 `web` 请求.

当然，其中也包含了一些可以提炼出来的能力

- useCompareEffect `深度对比Effect, 可参考`[useDeepCompareEffect](https://ahooks.js.org/zh-CN/hooks/use-deep-compare-effect)
- usePrevious `获取上一个props的hook, 可参考`[usePrevious](https://ahooks.js.org/zh-CN/hooks/use-previous)
- react-fast-compare `深度对比值帮助函数，可参考`[react-fast-compare](https://www.npmjs.com/package/react-fast-compare)

对于简单的项目，可以参照以上自行实现处理。但是对于公司项目来说，可以使用成熟的库更加合适 例如 [ahooks](https://ahooks.js.org/zh-CN) 或者 [reactuses](https://www.reactuse.com/zh-Hans/)，它们可以更好的帮助你管理和复用代码，当然前提是你需要习惯那种代码风格 😜
