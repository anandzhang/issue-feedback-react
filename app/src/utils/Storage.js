export default class Storage {
  static save (key, value) {
    typeof value === 'object' && (value = JSON.stringify(value))
    window.localStorage.setItem(key, value)
  }

  static saveMany (obj) {
    Object.entries(obj).map(value => {
      this.save(value[0], value[1])
    })
  }

  static get (key) {
    return window.localStorage.getItem(key)
  }

  static delete (key) {
    window.localStorage.removeItem(key)
  }

  static deleteMany (arr) {
    arr.forEach(value => this.delete(value))
  }
}
