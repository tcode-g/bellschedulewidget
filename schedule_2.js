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
//  ["", "", "Break"],
    ["8:51", "9:40"],
    ["9:47", "10:28"],
    ["10:28", "11:00", "Lunch"]
  ]
}
    

var [day, hrs, min] = getDateVars()

var schoolDay = (day > 0 && day < 6)
var schoolHrs = (day == 3) ? scheduleTimes.Wednesday : scheduleTimes.Regular

let startTime = new Date()
startTime.setHours(0,0,0,0)
console.log(new Date(startTime.getTime()).toLocaleTimeString())


function getDateVars() {
  let d = new Date()
  return [d.getDay(), d.getHours(), d.getMinutes()]
}
function getNextClass() {
  
  for (let i = 0; i < schoolHrs.length; i++) {
    let classTimes = schoolHrs[i]
    let start = classTimes[0]
    let end = classTimes[1]
    

    
    if(classTimes.length == 3 && classTimes[2] == "Break") {
      console.log("break")

    } else {
      console.log("not break")
    }
    
    let startSplit = start.split(":")
    let endSplit = end.split(":")
    
    let startOfClass = ((parseInt(startSplit[0])*60)+parseInt(startSplit[1]))*1000
    let endOfClass
=((parseInt(endSplit[0])*60)+parseInt(endSplit[1]))*1000
    console.log(startTime.getTime()+endOfClass)
    
//     
//     if (startSplit[0] == hrs.toString()) {
//       
//     }  
  }
}


getNextClass()
console.log(new Date().getTime())