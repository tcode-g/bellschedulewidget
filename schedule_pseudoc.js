


/* pseudocode for code renovation
 * 
 * establish schedule hours for the day
 * establish the special days that have their own scedule
 * 
 * creat function to get the shedule for this day
 * 
 * function to convert a class time to milliseconds in the current day
 * function to get the time until the other time given
 * 
 *	create function getCurrentClass
 		check if current time is less than first period time, 
        check if current time is less than the last period time
        >return on each check if true
        
 * 		search through the schedule
 * 			determine the start and end of this period
 * 			if start is greater than the current time then
 * 				there is no current class, youre changing classes
 * 			elseif end is greater than the current time them
 * 				in the period, display time until the period ends
 */

const scheduleTimes = {
    "Regular": [
        ["7:15", "8:03"],
        ["8:10", "8:58"],
        ["8:58", "9:09", "Break"],
        ["9:16", "10:10"],
        ["10:17", "11:05"],
        ["11:05", "11:35", "Lunch"]
    ],
    "Wednesday": [
        ["7:15", "7:56"],
        ["8:03", "8:44"],
        ["8:51", "9:40"],
        ["9:47", "10:28"],
        ["10:28", "11:00", "Lunch"]
    ]
}
const specialDays = {
  
}

const currentTime = new Date()
const Now = Now
const Today = currentTime.getDay()
const isSchoolDay = (Today>0 && Today<6)
const isWednesday = (Day == 3)
var isSpecialDay = false
var Display = {
  "title": "No School Today!",
  "body": ""
}

const dayStart = new Date()
dayStart.setHours(0,0,0,0)


function convertTime(timeString) {
  let timeSplit = timeString.split(":")
  let converted = ((parseInt(timeSplit[0])*60) + parseInt(timeSplit[1])) * 60000  // 60k is mins to MS
  return Now + converted
}
function formattedTimeUntil(last, next) {
  let remainingDate = new Date(dayStart.getTime() + (last - next))
  let hours = remainingDate.getHours()
  let mins = remainingDate.getMinutes()
  return `${(hours > 0) ? hours.toString() + ((hours == 1) ? " hour " : " hours ") : ""}${mins.toString() + ((mins == 1) ? " min" : " mins")}`
}

function getTodaysSchedule() {
  var todaysSchedule = null
  for (let day in specialDays) {
    let formattedDate = (currentTime.getMonth()+1).toString() + "/" + currentTime.getDate().toString()
    if (formattedDate == day) {
      todaysSchedule = scheduleTimes[specialDays[day]]
      isSpecialDay = true
      break
    }
  }
  if (!todaysSchedule) {
    todaysSchedule = scheduleTimes[(currentTime.getDay()) == 3 ? "Wednesday" : "Regular"]
  }
}
function calculateDisplay() {
  if (!todaysSchedule || !isSchoolDay) return;
  
  let firstClass = todaysSchedule[0][0]
  let lastClass = todaysSchedule[todaysSchedule.length-1][1]
  if (Now < convertTime(firstClass)) {
    // before school
    Display.title = "Before School"
    Display.body = formattedTimeUntil(convertTime(firstClass), Now)
  } else if(Now > convertTime(lastClass)) {
    // after school
    Display.title = "Finished"
    Display.body = "No more class!"
  } else {
    for (let c = 0; c < scheduleHours.length-1; c++) {
      let [classStart, classEnd, className] = scheduleHours[c]
      let periodFix = 0
      if (!isWednesday && !isSpecialDay && c > 3) {
        periodFix = -1
      }
      let periodName = className || "Period" + (c + 1 + periodFix).toString()
      if (convertTime(classStart) > Now) {
        // changing classes to this one
        // TODO: THIS PERIOD ADDITION WONT WORK AFTER 2ND PERIOD
        // let periodName = className || "Period" + (c + 1).toString()
        Display.title = "Until " + periodName
        Display.body = "Starts in:\n" + formattedTimeUntil(Now, convertTime(classStart))
        break
      } else if (convertTime(classEnd) > Now) {
        // in this period
        Display.title = periodName
        Display.body = "Ends in:\n" + getTimeUntil(convertTime(classEnd), Now)
      }
    }
  }
}
async function createWidget() {
  const widget = new ListWidget()
  let header = widget.addText(Display.title)
  header.textColor = Color.black()
  widget.addSpacer(70)
  let displaySplit = Display.body.split("\n")
  displaySplit.forEach(e => widget.addText(e).textColor = Color.black())
  widget.refreshAfterDate = new Date(Date.now() * 60 * 1000)
  try {
    backg = await new Request("https://i.imgur.com/VlVW18w.jpg").loadImage()
    widget.backgroundImage = backg
  } catch (e) {
    backg = Color.black()
    widget.backgroundColor = backg
  }
  Script.setWidget(widget)
}

getTodaysSchedule()
calculateDisplay()
await createWidget()
