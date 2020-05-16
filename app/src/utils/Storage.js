export default class Storage {
  static save (key, value) {
    window.localStorage.setItem(key, value)
  }

  static saveJSON (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static get (key) {
    window.localStorage.getItem(key)
  }

  static remove (key) {
    window.localStorage.removeItem(key)
  }
}
