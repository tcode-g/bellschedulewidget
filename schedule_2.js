const scheduleTimes = {
  "Regular": [
    ["7:15", "8:03"],
    ["8:10", "8:58"],
    ["8:58", "9:09", "Break"],
    ["9:16", "10:10"],
    ["10:17", "11:05"],
    ["11:05", "11:35", "Lunch"],
    ["22:04", "22:35", "Fake"]

  ],
  "Wednesday": [
    ["7:15", "7:56"],
    ["8:03", "8:44"],
    //  ["", "", "Break"],
    ["8:51", "9:40"],
    ["9:47", "10:28"],
    ["10:28", "11:00", "Lunch"]
  ]
}


// var [day, hrs, min, ms] = getDateVars()
var [day, ms] = getDateVars()

var schoolDay = (day > 0 && day < 6)
var schoolHrs = (day == 3) ? scheduleTimes.Wednesday : scheduleTimes.Regular
let displayText = []
let startTime = new Date()
startTime.setHours(0, 0, 0, 0)


function getDateVars() {
  let d = new Date()
  // return [d.getDay(), d.getHours(), d.getMinutes(), d.getTime()]
  return [d.getDay(), d.getTime()]
}
let msConv = (tbl) => {return startTime.getTime() + ((parseInt(tbl[0]) * 60) + parseInt(tbl[1])) * 60 * 1000}
function getNextClass() {
  // 60 for seconds, 1000 for milliseconds

  for (let i = 0; i < schoolHrs.length; i++) {
    // [day, hrs, min, ms] = getDateVars()

    let classTimes = schoolHrs[i]
    let startOfClass = msConv(classTimes[0].split(":"))
    // let endOfClass = msConv(classTimes[1].split(":"))

    if (ms < startOfClass) {
      return i;
    }
  }

  // if there isn't a next class
  return 0;
}
function timeLeft(index) {
  let classTimes = schoolHrs[index]
  let endOfClass = msConv(classTimes[1].split(":"))
  // if time is higher than end of this class or index is last item in list
  if (endOfClass < ms || index == schoolHrs.length) {
    displayText.push("End of day!")
    console.log("End of day.")
  } else {
    let remainingDate = new Date(startTime.getTime() + (endOfClass - ms))
    let taskText = ""
    let hrsLeft = remainingDate.getHours()
    let minsLeft = remainingDate.getMinutes()
    if (hrsLeft > 0) {
      taskText += hrsLeft.toString() + ((hrsLeft == 1) ? " hour" : " hours");
    }
    taskText += minsLeft.toString() + ((minsLeft == 1) ? " min" : " mins");
    taskText += " left"
    console.log(taskText)
  }
}

let nextClass = getNextClass()
timeLeft(nextClass)

// console.log(nextClass)