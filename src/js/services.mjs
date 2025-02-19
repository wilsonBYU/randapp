import { joinData } from "./utils";

const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL;
const UNSPLASH_URL = import.meta.env.VITE_UNSPLASH_URL;
const UNSPLASH_ACCESS = import.meta.env.VITE_UNSPLASH_ACCESS;

/*
https://calendar.google.com/calendar/render?
  action=TEMPLATE
  &dates=20240402%2F20240403
  &details=Talk%20a%20pet%20to%20a%20walk%21
  &location=randapp.com
  &text=this%20is%20a%20testroom

https://outlook.live.com/calendar/0/action/compose?
  allday=true&
  body=Talk%20a%20pet%20to%20a%20walk%21&
  enddt=2024-04-03T06%3A00%3A00%2B00%3A00&
  location=randapp.com&
  path=%2Fcalendar%2Faction%2Fcompose
  &rru=addevent
  &startdt=2024-04-02T06%3A00%3A00%2B00%3A00&
  subject=this%20is%20a%20testroom

https://outlook.office.com/calendar/action/compose?
  allday=true&
  body=Talk%20a%20pet%20to%20a%20walk%21&
  enddt=2024-04-03T06%3A00%3A00%2B00%3A00&
  location=randapp.com&
  path=%2Fcalendar%2Faction%2Fcompose&
  rru=addevent&
  startdt=2024-04-02T06%3A00%3A00%2B00%3A00&
  subject=this%20is%20a%20testroom

https://calendar.yahoo.com/?
  desc=Talk%20a%20pet%20to%20a%20walk%21
  &dur=
  &et=20240402T154500Z
  &in_loc=randapp.com
  &st=20240402T151500Z
  &title=this%20is%20a%20testroom
  &v=60

https://calendar.yahoo.com/?
  desc=Talk%20a%20pet%20to%20a%20walk%21&
  dur=&et=20240402T154500Z&
  in_loc=randapp.com&
  st=20240402T151500Z&
  title=this%20is%20a%20testroom&
  v=60

*/

const responseToJson = async (res, api) => {
  const response = await res.json();
  localStorage.setItem(api, res.ok);
  if (res.ok) {
    return response;
  } else {
    throw res;
  }
};

export default class ExternalServices {
  constructor() {
    this.activity = [];
    this.photo = [];
    this.item = {};
  }

  async fetchRandomActivity(type) {
    const response = await fetch(
      type ? `${ACTIVITY_URL}${type}` : `${ACTIVITY_URL}`,
    );
    const data = await responseToJson(response, "boredApi");
    return data;
  }

  async fetchRelatedImages(text = "random activity") {
    const response = await fetch(`${UNSPLASH_URL}&query=${text}`, {
      type: "GET",
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS}`,
        "x-total": "10",
        w: "1920",
        h: "1080",
      },
    });
    const data = await responseToJson(response, "unsplashApi");
    return data;
  }

  async getRandomActivity(type = null) {
    this.activity = await this.fetchRandomActivity(type);
    this.photo = await this.fetchRelatedImages(this.activity.activity);
    const data = joinData(this.activity, this.photo);
    return data;
  }
}
