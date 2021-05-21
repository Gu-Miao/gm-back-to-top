# Gm Back To Top

简单的返回顶部组件。

[简体中文](./README_zh.md) | **English**

如果你喜欢这个库，请个我一个 [star](https://github.com/Gu-Miao/gm-back-to-top) ⭐。

如果你发现了一个 bug，你可以在[这里](https://github.com/Gu-Miao/gm-back-to-top/issues)提一个 issuse 🐛。

## 安装

```bash
npm install gm-back-to-top -S
# 或者用 yarn
yarn add gm-back-to-top
```

或者用 `<script>` 标签引入：

```html
<link rel="stylesheet" href="你/的/路/径/gm-back-to-top.min.css" />
<script src="你/的/路/径/gm-back-to-top.min.js"></script>
```

你可以访问 [Releases Page](https://github.com/Gu-Miao/gm-back-to-top/releases) 获取打包后的 css 和 js 文件，或者用像 `jsDelivr` 这样的 CDN。

## 使用

使用 `import/require`:

```js
import GmBackToTop from 'gm-back-to-top'
import 'gm-back-to-top/gm-back-to-top.min.css'

// 创建组件实例
const instance = GmBackToTop()
```

如果你使用 `<script/>` 标签引入， `GmBackToTop` 会挂载到 `window` 上。

> 别忘了引入 CSS 文件。

## API

### GmBackToTop(options)

创建组件实例。

- `options` **{ object }**

配置项如下所示：

| name             | type                  | description                      | default    |
| ---------------- | --------------------- | -------------------------------- | ---------- |
| duration         | number                | 返回顶部需花费的时间，单位为毫秒 | `1 * 1000` |
| container        | \*                    | 可滚动的区域的容器元素           | `window`   |
| visibilityHeight | number                | 滚动高度到达何值时显示组件       | `500`      |
| done             | function              | 返回顶部后的回调函数             | `() => {}` |
| children         | string \| HTMLElement | 返回按钮的内容                   | `'back'`   |

此函数会返回一个组件实例，它与构造函数的关系为：

```js
instance.__proto__ = GmBackToTop.prototype
```

因此实例可以使用 `GmBackToTop` 上的所有原型方法。

实例会拥有下列属性：

```js
GmBackToTop {
  duration,
  container,
  visibilityHeight,
  done,
  children,
  id, // 实例 ID
  ele // 按钮元素
}
```

> 请勿直接重写实例上的属性，你可以调用 `GmBackToTop.prototype.setOptions()` 取修改。

### GmBackToTop.prototype.isShow()

判断组件是否显示。

- `return` **{ boolean }**

显示返回 `true`，否则返回 `false`。

### GmBackToTop.prototype.show()

显示组件。

- `return` **{ GmBackToTop }**

返回组件实例本身。

### GmBackToTop.prototype.hide()

隐藏组件。

- `return` **{ GmBackToTop }**

返回组件实例本身。

### GmBackToTop.prototype.trigger()

触发组件按钮的点击，直接返回顶部。

- `return` **{ GmBackToTop }**

返回组件实例本身。

### GmBackToTop.prototype.setOptions(options)

修改组件的配置。

- `options` **{ object }**

新的配置。

- `return` **{ GmBackToTop }**

返回组件实例本身

## 许可证

MIT
