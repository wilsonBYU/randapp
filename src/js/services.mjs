import { joinData } from "./utils"

const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL
const UNSPLASH_URL = import.meta.env.VITE_UNSPLASH_URL
const UNSPLASH_ACCESS = import.meta.env.VITE_UNSPLASH_ACCESS

/*
https://calendar.google.com/calendar/render?
  action=TEMPLATE
  &text=title of the event
  &details=more details about the event
  &recur=RRULE:FREQ%3DWEEKLY;UNTIL%3D20210603
  &ctz=timezone here
  &dates=20220112T180000Z%2F20220112T200000Z
  &location=New%20Earth

https://outlook.office.com/calendar/0/deeplink/compose?
  body=Learn%20all%20about%20the%20rules%20of%20the%20Motorway%20and%20how%20to%20access%20the%20fast%20lane.%0A%0Ahttps%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGridlock_%28Doctor_Who%29
  &enddt=2022-01-12T20%3A00%3A00%2B00%3A00
  &location=New%20Earth
  &path=%2Fcalendar%2Faction%2Fcompose
  &rru=addevent
  &startdt=2022-01-12T18%3A00%3A00%2B00%3A00
  &subject=Welcome%20to%20the%20Motorway


https://calendar.aol.com/?
  desc=Learn%20all%20about%20the%20rules%20of%20the%20Motorway%20and%20how%20to%20access%20the%20fast%20lane.%0A%0Ahttps%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGridlock_%28Doctor_Who%29
  &dur=
  &et=20220112T190000Z
  &in_loc=New%20Earth
  &st=20220112T170000Z
  &title=Welcome%20to%20the%20Motorway
  &v=60


https://calendar.yahoo.com/?
  desc=Learn%20all%20about%20the%20rules%20of%20the%20Motorway%20and%20how%20to%20access%20the%20fast%20lane.%0A%0Ahttps%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGridlock_%28Doctor_Who%29
  &dur=
  &et=20220112T190000Z
  &in_loc=New%20Earth
  &st=20220112T170000Z
  &title=Welcome%20to%20the%20Motorway
  &v=60
*/

const responseToJson = async (res) => {
  const response = await res.json()
  if (res.ok) {
    return response
  } else {
    throw res
  }
}

export default class ExternalServices {

  constructor() {
    this.activity = []
    this.photo = []
    this.item = {}
  }

  async fetchRandomActivity(type = "activity") {
    const response = await fetch(`${ACTIVITY_URL}${type}`)
    const data = await responseToJson(response)
    return data
  }

  async fetchRelatedImages(text = "random activity") {
    const response = await fetch(`${UNSPLASH_URL}&query=${text}`, {
      type: "GET",
      headers: {
        "Authorization": `Client-ID ${UNSPLASH_ACCESS}`,
        "x-total": "10",
        "w": "1920",
        "h": "1080"
      }
    })
    const data = await responseToJson(response)
    return data
  }

  async getRandomActivity() {
    this.activity = await this.fetchRandomActivity()
    this.photo = await this.fetchRelatedImages(this.activity.activity)
    const data = joinData(this.activity, this.photo)
    return data
  }

}