function setToken (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
function getToken (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
function delToken (key) {
  window.localStorage.removeItem(key)
}
export { setToken, getToken, delToken }
