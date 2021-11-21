const scheduleTimes = {
  "Regular" : [
    ["7:15", "8:03"],
    ["8:10", "8:58"],
    ["8:58", "9:09", "Break"],
    ["9:16", "10:10"],
    ["10:17", "11:05"],
    ["11:05", "11:35", "Lunch"]
  ],
  "Wednesday" : [
    ["7:15", "7:56"],
    ["8:03", "8:44"],
    ["", "", "Break"],
    ["8:51", "9:40"],
    ["9:47", "10:28"],
    ["10:28", "11:00", "Lunch"]
  ]
}

//const widget = new Widget()

let [day, hour, min] = getDateVars()
//let day = date.getDay()
//let hour = date.getHour()
//let min = date.getMinutes()
console.log(day)
let init = false

if (day > 0 && day < 6) {
  var schedule = (day == 3) ? scheduleTimes.Wednesday : scheduleTimes.Regular
  init = true
}


function getDateVars() {
  let d = new Date()
  return d.getDay(), d.getHour(), d.getMinutes()
}
function currentClass() {
  if (hour >= 7 && hour <= 11) {
    for (let i = 0; i < schedule.length; i++) {
      let classTimes = schedule[i]
      let start = classTimes[0]
      let end = classTimes[1]
      
    }
  }
}
function findNextClass() {
  if (init == true) {
    date = new Date()
    
  }
}

function convertTime(timeString) {
  let timeTable = timeString.split(":")
  let hrs = timeTable[0]

}
