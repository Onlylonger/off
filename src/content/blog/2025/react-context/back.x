---
title: React 状态管理库 · Context API
layout: blog
---

<script setup>
import Demo from '@/components/ReactWrap/index.vue'
import OriginApp from './demo/origin.jsx'
import OptimizationApp from './demo/index.jsx'
</script>

# {{ $frontmatter.title }}

## 起因

在使用 `React` 时开发简单的项目时，想管理全局的 状态数据，但是又不想使用任何第三方库，内置的 `Context` 是个不错的方案。

使用方式如下：

::: code-group

<<< ./demo/origin.jsx

:::

### 结果如下

<Demo :component="OriginApp"/>

但是在定义和使用的时候，能否简化下呢？

- `Provider` 初始化后，只需调用 `useXX` 就返回 `Context` 的值，而无需再引入具体 `Context`
- 目前 `state` 和 `updateState` 的揉杂在一起，有没有更好的代码组织方式 ?

## 思路

为了梳理思路，我们可以画个图，如下:

![logic](../assets/image.png)

## 实现

核心代码如下：

::: code-group

<<< ./demo/store/create-store.jsx[store/create-store.jsx]

:::

以上就是全部代码了,包含换行只有 `22` 行代码实现, 让我们作为调用方试试

::: code-group

<<< ./demo/index.jsx

<<< ./demo/store/counter.js[store/counter.js]

:::

### 结果展示

<Demo :component="OptimizationApp"/>

## 优缺点

对比 `redux`,`zustand` 这一类状态管理库，此种实现也是需要使用者去权衡利弊的。关于 `zustand` 和 `redux` 之间的区别，可以看这里 [zustand 与其它库的比较](https://docs.pmnd.rs/zustand/getting-started/comparison)。当前方案优缺点如下：

| 方案                  | 优点             | 缺点                                                                                                                                                                |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Context 方案 / 本方案 | 易理解，使用简单 | 依赖 React,没有 `render` 优化,`Provider` 父组件全量渲染, 详细请看这个 [RFCS](https://github.com/reactjs/rfcs/blob/main/text/0147-use-mutable-source.md#context-api) |
