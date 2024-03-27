import { base64ToJson } from "./utils";

const activityItem = (activity) => {
  const obj = base64ToJson(activity)
  return `
    <a href="/activity_details/index.html?data=${activity}">
      <li class="btn btn-orange activity-list_item">
        <div class="activity-list_item-container">
          <div>
            <p class="mp-0">${obj.activity}</p>
            <sub>Completed: ${obj.completed ? "Yes" : "No"} | In Progress: ${obj.inProgress ? "Yes" : "No"} | Date: ${obj.date ? obj.date : "Not Set"}</sub>
          </div>
          <img src="${obj.image.src.thumb}" />
        </div>
      </li>
    </a>
  `
}

const activityList = (activities) => `<ul class="myActivityList fw">${activities.map(activityItem).join("")}</ul>`;

export default class MyActivities {
  constructor(activityList, parentElement) {
    this.activityList = activityList
    this.parentElement = parentElement
  }

  init() {
    this.renderActivities()
  }

  renderActivities() {
    const list = activityList(this.activityList)
    if (this.activityList.length > 0) {
      this.parentElement.insertAdjacentHTML("beforeend", list)
    } else {
      this.parentElement.insertAdjacentHTML("afterbegin", "<h2>You have not added any activity yet. Click</h2><a href='/' class='btn btn-aqua'>Home<a><h2>for more options</h2>")
    }
  }
}