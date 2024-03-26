import { base64ToJson, getLocalStorage } from "./utils"

const options = () => {
  return `
    <section class="main_actions">
      <a href="/my_activities/index.html" class="btn fw btn-aqua">My activities</a>
      <a class="btn fw btn-red">Delete</a>
      <a class="btn fw btn-green">Save</a>
    </section>
  `
}

export default class ActivityDetails {
  constructor(data, parentElement) {
    this.data = data
    this.dataJson = base64ToJson(this.data)
    this.parentElement = parentElement
  }

  init() {
    this.parentElement.insertAdjacentHTML("afterbegin", options())
    this.parentElement.insertAdjacentHTML("beforeend", JSON.stringify(this.dataJson))
  }

  save() {
    getLocalStorage("activities")
  }

}