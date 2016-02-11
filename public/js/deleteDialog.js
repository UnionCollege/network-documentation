var del = document.querySelector('delete')
var showdelButton = document.querySelector('show-del')
console.log(showdelButton)
if (!del.showModal) {
  dialogPolyfill.registerDialog(del)
}
showdelButton.addEventListener('click', function () {
  del.showModal()
})
del.querySelector('.close').addEventListener('click', function () {
  del.close()
})
