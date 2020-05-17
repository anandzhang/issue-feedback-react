export default class Storage {
  static save (key, value) {
    window.localStorage.setItem(key, value)
  }

  static saveMany (obj) {
    Object.entries(obj).map(value => {
      this.save(value[0], value[1])
    })
  }

  static saveJSON (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static get (key) {
    return window.localStorage.getItem(key)
  }

  static remove (key) {
    window.localStorage.removeItem(key)
  }
}
