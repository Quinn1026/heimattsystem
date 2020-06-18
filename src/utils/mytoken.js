function setToken (key, value) {
  window.localStorage.setItem(key, value)
}
function getToken (key) {
  return window.localStorage.getItem(key)
}
function delToken (key) {
  window.localStorage.removeItem(key)
}
export { setToken, getToken, delToken }
