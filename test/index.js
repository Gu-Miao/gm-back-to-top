function testWindow() {
  document.body.innerHTML += new Array(500).fill('<p>aaaa</p>').join('')
  window.a = window.GmBackToTop()

  console.log('instance:\n', window.a)
}

function testDocument() {
  // document.documentElement.style.overflow = 'hidden'
  document.body.innerHTML += new Array(500).fill('<p>aaaa</p>').join('')

  window.a = window.GmBackToTop({ container: document })

  console.log('instance:\n', window.a)
}

function testBody() {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'auto'
  document.body.style.height = '100vh'
  document.body.innerHTML += new Array(500).fill('<p>aaaa</p>').join('')

  window.a = window.GmBackToTop({ container: document.body })

  console.log('instance:\n', window.a)
}

function testUl() {
  document.body.innerHTML += '<ul>' + new Array(500).fill('<li>aaaa</li>').join('') + '</ul>'
  const ul = document.querySelector('ul')
  ul.style.overflow = 'auto'
  ul.style.height = '500px'

  window.a = window.GmBackToTop({ container: ul })

  console.log('instance:\n', window.a)
}

// testWindow()
// testDocument()
// testBody()
testUl()
