import { getScroll, scrollTo } from './utils'

/**
 * Create back to top button and append it to `document.body`.
 *
 * @returns {HTMLElement} Created button element.
 */
function createBtn() {
  const btn = document.createElement('button')
  btn.classList.add('gm-back-to-top')
  if (document.body) {
    document.body.append(btn)
  } else {
    window.addEventListener('load', () => document.body.append(btn))
  }
  return btn
}

/**
 * Save a simple uuid of component instance and a map to save
 * listeners for `removeEventListener`.
 */
let instanceId = 0
const instanceMap = new Map()

/**
 * Instantiate component.
 *
 * @param {object} options Options for component instance.
 * @returns {GmBackToTop} Return component instance.
 */
function GmBackToTop(options) {
  instanceId++

  const instance = { id: instanceId, ele: createBtn() }

  instance.__proto__ = GmBackToTop.prototype

  GmBackToTop.prototype.setOptions.call(instance, options)

  return instance
}

/**
 * Default options:
 *
 * @param {number} duration Duration from current place to top, unit is ms.
 * @param {*} container Container element of Scrollable area, default is `window`.
 * @param {number} visibilityHeight Show component when scroll distance is more than this value.
 * @param {*} container Container element of Scrollable area, default is `window`.
 * @param {function} done A callback exec when back to top.
 * @param {HTMLElement|string} children Content of back to top button.
 */
const defaultOptions = {
  duration: 1 * 1000,
  container: window,
  visibilityHeight: 500,
  done: () => {},
  children: 'back'
}

/**
 * Set options for component.
 *
 * @param {object} options Options for component instance.
 * @returns {GmBackToTop} Return component instance.
 */
GmBackToTop.prototype.setOptions = function (options = {}) {
  // Use new value to cover old.
  const newInstanceProperties = { ...defaultOptions, ...this, ...options }
  const { duration, container, visibilityHeight, done, children } = newInstanceProperties

  Object.keys(newInstanceProperties).forEach(name => (this[name] = newInstanceProperties[name]))

  const { id, ele } = this

  // Save listenrs for unbinding.
  const funcs = {
    scroll: () => {
      const distance = getScroll(container)
      const isShow = this.isShow()
      distance >= visibilityHeight ? !isShow && this.show() : isShow && this.hide()
    },
    click: () => scrollTo(0, { duration, container, callback: done })
  }

  // Remove prev listeners.
  let prevFuncs
  if ((prevFuncs = instanceMap.get(id))) {
    container.removeEventListener('scroll', prevFuncs.scroll)
    ele.removeEventListener('click', prevFuncs.click)
  }

  // Exec scroll() frist to mask sure button displays correctly.
  funcs.scroll()

  // Add new listeners and keep it in map.
  container.addEventListener('scroll', funcs.scroll)
  ele.addEventListener('click', funcs.click)

  instanceMap.set(id, funcs)

  // Modify content of button element.
  ele.innerHTML = ''
  ele.append(children)

  return this
}

/**
 * Get if button is showing.
 *
 * @returns {boolean} Ture if it's showing, false if not.
 */
GmBackToTop.prototype.isShow = function () {
  return this.ele.style.display !== 'none'
}

/**
 * Display the button.
 *
 * @returns {GmBackToTop} Return component instance.
 */
GmBackToTop.prototype.show = function () {
  this.ele.style.display = ''

  return this
}

/**
 * Hide the button.
 *
 * @returns {GmBackToTop} Return component instance.
 */
GmBackToTop.prototype.hide = function () {
  this.ele.style.display = 'none'

  return this
}

/**
 * Trigger click of button.
 *
 * @returns {GmBackToTop} Return component instance.
 */
GmBackToTop.prototype.trigger = function () {
  this.ele.click()

  return this
}

export default GmBackToTop
