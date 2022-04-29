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

/*
TODO:


*/

// Constant Variables
const TIMENOW = new Date()
const DAY = TIMENOW.getDay()
const MILLI = TIMENOW.getTime()

const startTime = new Date()
startTime.setHours(0,0,0,0) // set start time to the beginning of the day

const isSchoolDay = (DAY>0 && DAY<6)
const isWednesday = (DAY==3)
const scheduleHours = isWednesday ? scheduleTimes.Wednesday : scheduleTimes.Regular


// Mutable Variables
var displayText = {
    "title": "",
    "body": ""
}


// Helper Functions
function convertTimeToMilli(time) {
    let [hours, minutesString] = time.split(":")
    let minutes = (parseInt(hours) * 60) + parseInt(minutesString)
    let miliSeconds = minutes * 60 * 1000 // 60k is minutes to miliseconds
    return miliSeconds + startTime.getTime()
}
function getTimeUntil(nextMS, prevMS) {
    let timeRemaining = new Date(startTime.getTime() + (nextMS - prevMS))
    let hours = timeRemaining.getHours()
    let minutes = timeRemaining.getMinutes()
    let remainingString = ""
    if (hours > 0) {
        remainingString += hours.toString() + (hours == 1)? " hour " : " hours "
    }
    if (minutes > 0) {
        remainingString += minutes.toString() + (minutes == 1)? " min" : " mins"
    }
    return remainingString
}
const clamp = (n, down, up) => Math.min(Math.max(n, down), up)


// Main
function calculateClasses() {
    if (!isSchoolDay) {
        displayText.title = "No School Today!"
        return
    }
    
    // REDO THIS SO ITS ALL ACCOUNTED FOR IN ONE CHECK USING THE METHOD IN "schedule_final.js"
    let firstClass = scheduleHours[0]
    let lastClass = scheduleHours[scheduleHours.length-1]
    // end of day check
    if (MILLI > convertTimeToMilli(lastClass[1])) {
        displayText.title = "Finished"
        displayText.body = "No more class!"
        return
    }
    // beginning of day check
    if (MILLI < convertTimeToMilli(firstClass[0])) {
        displayText.title = "Before School"
        displayText.body = getTimeUntil(convertTimeToMilli(firstClass[0]), MILLI)
        return
    }


}


