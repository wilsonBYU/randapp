import { base64ToJson } from "./utils";

const activityItem = (activity) => {
  const obj = base64ToJson(activity)
  return `
    <li class="btn btn-orange activity-list_item">
      <a href="/activity_details/index.html?data=${activity}">
      <div class="activity-list_item-container">
        <div>
          <p class="mp-0">${obj.activity}</p>
          <sub>Completed: ${obj.completed ? "Yes" : "No"} | Date: ${obj.date ? obj.date : "Not Set"}</sub>
        </div>
        <img src="${obj.image.src.thumb}" />
      </div>
      </a>
    </li>
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
    this.parentElement.insertAdjacentHTML("beforeend", list)
  }
}