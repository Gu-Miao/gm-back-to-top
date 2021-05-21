import GmBackToTop from '../index'

const i = 500

const arr = new Array(i).fill('<p>content</p>')

document.body.innerHTML += arr.join('')

const a = GmBackToTop({
  // container: document.body,
  duration: 3000,
  children: 'aa',
  done: () => console.log('done'),
  visibilityHeight: 100
})

console.log(a)
