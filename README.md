# Gm Back To Top

A simple back to top component.

[简体中文](./README_zh.md) | **English**

If you like this, give me a [star](https://github.com/Gu-Miao/gm-back-to-top) ⭐ plz.

If you find a bug, submit an issuse 🐛 [here](https://github.com/Gu-Miao/gm-back-to-top/issues).

## Install

```bash
npm install gm-back-to-top -S
# Or use yarn
yarn add gm-back-to-top
```

Or just use `<script>` tag:

```html
<link rel="stylesheet" href="path/to/gm-back-to-top.min.css" />
<script src="path/to/gm-back-to-top.min.js"></script>
```

To get dist js and css files, please visit [Releases Page](https://github.com/Gu-Miao/gm-back-to-top/releases) or use CDN like `jsDelivr`.

## Usage

If you use `import/require`:

```js
import GmBackToTop from 'gm-back-to-top'
import 'gm-back-to-top/gm-back-to-top.min.css'

// Create an component instance with options
// or just use default options.
const instance = GmBackToTop()
```

If you use `<script/>` tag to import, `GmBackToTop` will be mounted on `window`.

> Don't forget to import css file.

## API

### GmBackToTop(options)

Create a new instance with options.

- `options` **{ object }**

Options feilds are showing below:

| name             | type                  | description                                                 | default    |
| ---------------- | --------------------- | ----------------------------------------------------------- | ---------- |
| duration         | number                | Duration from current place to top, unit is ms              | `1 * 1000` |
| container        | \*                    | Container element of Scrollable area                        | `window`   |
| visibilityHeight | number                | Show component when scroll distance is more than this value | `500`      |
| done             | function              | A callback exec when back to top                            | `() => {}` |
| children         | string \| HTMLElement | Content of back to top button                               | `'back'`   |

It will return a component instance, the relationship between them is:

```js
instance.__proto__ = GmBackToTop.prototype
```

So that instance could use all of prototype methods on `GmBackToTop`.

Instance will have those properties:

```js
GmBackToTop {
  duration,
  container,
  visibilityHeight,
  done,
  children,
  id, // instance id
  ele // button component element
}
```

> Don't rewrite atrrbuties on instance directly, you should call `GmBackToTop.prototype.setOptions()` to do that.

### GmBackToTop.prototype.isShow()

Get if component is showing.

- `return` **{ boolean }**

Return `ture` if it's showing, `false` if not.

### GmBackToTop.prototype.show()

Display the component.

- `return` **{ GmBackToTop }**

Return component instance itself.

### GmBackToTop.prototype.hide()

Hide the component.

- `return` **{ GmBackToTop }**

Return component instance itself.

### GmBackToTop.prototype.trigger()

Trigger click of button.

- `return` **{ GmBackToTop }**

Return component instance itself.

### GmBackToTop.prototype.setOptions(options)

Set options for component.

- `options` **{ object }**

Options for component instance.

- `return` **{ GmBackToTop }**

Return the instance itself.

## License

MIT
