const modalTemplate = (activity = {}) => {
  return `<dialog id="dialogCalendar" class="calendarModal">
    <h2>Save to your calendar!</h2>
    <form class="calendarForm">
      <label for="subject" class="flexed">
        Title:
        <input type="text" name="subject" value="${activity.activity}"/>
      </label>
      <label for="body" class="flexed">
        Body: 
        <textarea name="body"></textarea>
      </label>
      <label for="startdt" class="flexed">
        Date start: 
        <input type="datetime-local" name="startdt" value="${activity.date ? activity.date + "T12:00:00" : new Date().toLocaleString("sv").split(" ").join("T")}">
      </label>
      <label for="enddt" class="flexed">
        Date end:
        <input type="datetime-local" name="enddt" value="${new Date().toLocaleString("sv").split(" ").join("T")}">
      </label >
  <label for="allday">
    All day
    <input type="checkbox" name="allday">
  </label>
    </form >
    <hr />
    <section class="action_buttons">
      <button class="btn fw btn-red gmail"><i class="fab fa-google"></i> Google Calendar</button>
      <button class="btn fw btn-blue outlook"><i class="fab fa-microsoft"></i> Microsoft Outlook</button>
      <button class="btn fw btn-orange office"><i class="fab fa-microsoft"></i> Office 365</button>
      <button class="btn fw btn-pink yahoo"><i class="fab fa-yahoo"></i> Yahoo! Calendar</button>
      <button class="btn fw btn-green close"><i class="fas fa-times"></i> Close</button>
      </section>
  </dialog > `;
};

const googleCalendarURLTemplate = (data, base64) => {
  const datest = new Date(data.startdt);
  const enddate = new Date(data.enddt);
  const url = `https://calendar.google.com/calendar/render?
action = TEMPLATE
  & dates=${datest.getFullYear()}${("0" + (datest.getMonth() + 1)).slice(-2)}${("0" + datest.getDate()).slice(-2)}% 2F${enddate.getFullYear()}${("0" + (enddate.getMonth() + 1)).slice(-2)}${("0" + enddate.getDate()).slice(-2)}
  & details=${encodeURI(data.body)}${encodeURI("\n See activity https://wilsonbyu.github.io/randapp/activity_details/?data=")}${base64}
  & text=${encodeURI(data.subject)} `;
  const strippedUrl = url.split(" ").join("");
  return strippedUrl;
};

const outlookCalendarTemplate = (data, base64) => {
  const url = `https://outlook.live.com/calendar/0/action/compose?
allday = ${data.allday === "on" ? "true" : "false"}
  & body=${encodeURI(data.body)}${encodeURI("\n See activity https://wilsonbyu.github.io/randapp/activity_details/?data=")}${base64}
  & enddt=${data.enddt}
  & location=https://wilsonbyu.github.io/randapp/
  & path=% 2Fcalendar % 2Faction % 2Fcompose
  & rru=addevent
    & startdt=${data.startdt}
  & subject=${encodeURI(data.subject)} `;
  const strippedUrl = url.split(" ").join("");
  return strippedUrl;
};

const officeCalendarTemplate = (data, base64) => {
  const url = `https://outlook.office.com/calendar/action/compose?
allday = ${data.allday === "on" ? "true" : "false"}
  & body=${encodeURI(data.body)}${encodeURI("\n See activity https://wilsonbyu.github.io/randapp/activity_details/?data=")}${base64}
  & enddt=${data.enddt}
  & location=https://wilsonbyu.github.io/randapp/
  & path=% 2Fcalendar % 2Faction % 2Fcompose &
  & rru=addevent &
  & startdt=${data.startdt}
  & subject=${encodeURI(data.subject)} `;
  const strippedUrl = url.split(" ").join("");
  return strippedUrl;
};

const yahooCalendarTemplate = (data, base64) => {
  const url = `https://calendar.yahoo.com/?
desc = ${encodeURI(data.body)}${encodeURI("\n See activity https://wilsonbyu.github.io/randapp/activity_details/?data=")}${base64}
  & dur=${data.allday === "on" ? "allday" : ""}
  & et=${data.enddt}
  & in_loc=https://wilsonbyu.github.io/randapp/
  & st=${data.startdt}
  & title=${encodeURI(data.subject)}
  & v=60`;
  const strippedUrl = url.split(" ").join("");
  return strippedUrl;
};

export default class CalendarExporter {
  constructor(activity, base64) {
    this.modal = null;
    this.data = {};
    this.activity = activity;
    this.activity64 = base64;
  }
  init() {
    this.addModal();
    this.modal = document.querySelector(".calendarModal");
    this.handleClose();
    this.handleGmail();
    this.handleOutlook();
    this.handleOffice();
    this.handleYahoo();
  }

  addModal() {
    document
      .querySelector(".main_container")
      .insertAdjacentHTML("afterBegin", modalTemplate(this.activity));
  }

  setActivity(activity, base64) {
    this.activity = activity;
    this.activity64 = base64;
    this.modal.remove();
    this.init();
  }

  showModal() {
    this.modal.showModal();
  }

  hideModal() {
    this.modal.close();
  }

  dataToJson() {
    const info = new FormData(document.querySelector(".calendarForm"));
    info.forEach((value, key) => (this.data[key] = value));
  }

  handleGmail() {
    document.querySelector(".gmail").addEventListener("click", () => {
      this.dataToJson();
      const data = googleCalendarURLTemplate(this.data, this.activity64);
      window.open(data);
    });
  }

  handleOutlook() {
    document.querySelector(".outlook").addEventListener("click", () => {
      this.dataToJson();
      const data = outlookCalendarTemplate(this.data, this.activity64);
      window.open(data);
    });
  }

  handleOffice() {
    document.querySelector(".office").addEventListener("click", () => {
      this.dataToJson();
      const data = officeCalendarTemplate(this.data, this.activity64);
      window.open(data);
    });
  }

  handleYahoo() {
    document.querySelector(".yahoo").addEventListener("click", () => {
      this.dataToJson();
      const data = yahooCalendarTemplate(this.data, this.activity64);
      window.open(data);
    });
  }

  handleClose() {
    document.querySelector(".close").addEventListener("click", () => {
      this.modal.close();
    });
  }
}
