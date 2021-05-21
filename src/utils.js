// Create simple uuid and save RAF ids.
let id = 0
const ids = new Map()

/**
 * Remove id of done RAF.
 *
 * @param {number} id RAF id.
 */
const cleanup = id => ids.delete(id)

/**
 * Use RAF to do somthing with a fn and delayFrames, when leftFrames is
 * 0, exec fn.
 *
 * This fn reference raf in `ant desgin` and `rc-util`.
 *
 * @param {function} callback Callback when animation is over.
 * @param {number} delayFrames Frames before fn executing.
 * @returns {number} Return id of this RAF.
 */
const raf = (callback = () => {}, delayFrames = 1) => {
  id += 1
  const _id = id

  function callRef(leftFrames) {
    if (leftFrames === 0) {
      // Clean up
      cleanup(_id)

      // Trigger
      callback()
    } else {
      // Next RAF
      const realId = requestAnimationFrame(() => {
        callRef(leftFrames - 1)
      })

      // Bind real RAF id
      ids.set(_id, realId)
    }
  }

  callRef(delayFrames)

  return id
}

/**
 * Remove id in Map of ids and call CAF.
 *
 * @param {number} id RAF id.
 * @returns {number} Real RAF id.
 */
raf.cancel = id => {
  const realId = ids.get(id)
  cleanup(realId)
  return cancelAnimationFrame(realId)
}

/**
 * Imitate `ease-in-out` fn
 *
 * @param {number} t
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @returns Next value.
 */
function easeInOutCubic(t, b, c, d) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

/**
 * Check if `obj` is `window`.
 *
 * @param {*} obj The obj to check.
 * @returns {boolean} True if it's window, false if not.
 */
const isWindow = obj => obj !== null && obj !== undefined && obj === obj.window

/**
 * Get Scroll distance of container.
 *
 * @param {*} target Container of scroll.
 * @returns {number} Scroll distance.
 */
export const getScroll = target => {
  let result = 0
  if (isWindow(target)) {
    result = target.pageYOffset
  } else if (target instanceof Document) {
    result = target.documentElement.scrollTop
  } else if (target) {
    result = target.scrollTop
  }
  if (target && !isWindow(target) && typeof result !== 'number') {
    result = (target.ownerDocument || target).documentElement?.scrollTop
  }
  return result
}

/**
 * Scroll to a designated `y`.
 *
 * @param {number} y Where to scroll to.
 * @param {object} options Config for scrolling.
 */
export const scrollTo = (y = 0, options = {}) => {
  const { container = window, callback = () => {}, duration = 1 * 1000 } = options
  const scrollTop = getScroll(container, true)
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration)
    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop)
    } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
      container.documentElement.scrollTop = nextScrollTop
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      raf(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  raf(frameFunc)
}
