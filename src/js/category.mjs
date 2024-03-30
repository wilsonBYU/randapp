import { getLocalStorage, joinData, jsonToBase64, setLocalStorage } from "./utils"

const activityButtons = () => {
  return `
  <section class="main_actions" style="--justify-content: space-between">
    <button class="category btn btn-blue fw" data-category="education"><i class="fas fa-book"></i> Education</button>
    <button class="category btn btn-red fw" data-category="recreational"><i class="fas fa-dice"></i> Recreational</button>
    <button class="category btn btn-green fw" data-category="social"><i class="fas fa-users"></i> Social</button>
    <button class="category btn btn-aqua fw" data-category="diy"><i class="fas fa-pencil-ruler"></i> DIY</button>
    <button class="category btn btn-pink fw" data-category="charity"><i class="fas fa-hand-holding-heart"></i> Charity</button>
    <button class="category btn btn-orange fw" data-category="cooking"><i class="fas fa-utensils"></i> Cooking</button>
    <button class="category btn btn-blue fw" data-category="relaxation"><i class="fas fa-hot-tub"></i> Relaxation</button>
    <button class="category btn btn-red fw" data-category="music"><i class="fas fa-music"></i> Music</button>
    <button class="category btn btn-green fw" data-category="busywork"><i class="fas fa-briefcase"></i> Busywork</button>
  </section>`
}

const activityItem = ([activity, index]) => {
  return `
    <section class="category-list_item">
      <div>
        <h3>${activity.activity}<h3>
        <sub>Type: <strong>${activity.type.toUpperCase()}</strong> | Accesibility: ${activity.accesibility} | Participants: ${activity.participants} | Price: ${activity.price}</sub>
      </div>
      <button class="btn btn-green addItem" data-index="${index}"><i class="fas fa-plus"></i></button>
    </section>
  `
}

const activityList = (activities) => `<section class="category-list fw">${activities.map(activityItem).join("")}</section>`

export default class Category {
  constructor(datasource, category, parent) {
    this.category = category
    this.datasource = datasource
    this.parent = parent
    this.activities = []
  }

  async init() {
    this.renderCategoryButtons()
    await this.renderActivities()
    document.querySelectorAll(".category").forEach(this.setCategoryEventListener.bind(this))
  }

  setCategoryEventListener(element) {
    element.addEventListener("click", (e) => {
      this.category = e.target.dataset.category
      this.cleanList()
      this.renderActivities()
    })
  }

  async setAddEventListener(element) {
    await element.addEventListener("click", async (e) => {
      const index = e.target.dataset.index
      let activity = this.activities[index]
      const image = await this.datasource.fetchRelatedImages(activity.activity)
      const activity64 = jsonToBase64(joinData(activity, image))
      setLocalStorage("activities", activity64)
      document.location.href = `/randapp/activity_details/?data=${activity64}`
    })
  }

  cleanList() {
    this.parent.removeChild(document.querySelector(".category-list"))
  }

  async renderActivities() {
    this.activities = await Promise.all([...Array(6).keys()].map(i => this.datasource.fetchRandomActivity(this.category ? `?type=${this.category}` : null)))
    const renderedActivities = activityList(this.activities.map((act) => [act, this.activities.indexOf(act)]))
    this.parent.insertAdjacentHTML("beforeend", renderedActivities)
    document.querySelectorAll(".addItem").forEach(this.setAddEventListener.bind(this))
  }

  renderCategoryButtons() {
    this.parent.insertAdjacentHTML("afterbegin", activityButtons())
  }

}