const scheduleTimes = {
    "Regular": [
        ["0:15", "0:50", "Beginning"],
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
        ["8:51", "9:40"],
        ["9:47", "10:28"],
        ["10:28", "11:00", "Lunch"]
    ]
}


/*
Wants:
    finds time until next class


Display:
    current current period
    time until next class
    blurred image of patriot logo
*/

const currentTime =  new Date()
const Day = currentTime.getDay()
const MS = currentTime.getTime()

const startTime = new Date()
startTime.setHours(0,0,0,0)

const scheduleHours = (Day == 3) ? scheduleTimes.Wednesday : scheduleTimes.Regular; // wednesday check

var displayText = {
    "title": "",
    "body": ""
}

// helpers
function stringToMs(timeString) {
    let timeSplit = timeString.split(":")
    let regMS = ((parseInt(timeSplit[0])*60) + parseInt(timeSplit[1])) * 60000  // 60k is mins to MS
    return regMS + startTime.getTime()
}
function getTimeUntil(pos, neg) {
    let remaining = new Date(startTime.getTime() + (pos - neg))
    let hrs = remaining.getHours()
    let mins  = remaining.getMinutes()
    return `${hrs.toString() + ((hrs == 1) ? " hour" : " hours")} ${mins.toString() + ((mins == 1) ? " min" : " mins")}`
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// main
function calculateClass() {
    let nextClass = scheduleHours.length;
    for(let s = 0; s < scheduleHours.length; s++) {
        let start = scheduleHours[s][0]
        let startMS = stringToMs(start)
        console.log(start, startMS)
        if (MS < startMS) {
            nextClass = s;
            break;
        }
    }
    let [classStart, classEnd, nPeriodName] = scheduleHours[nextClass]
    let nextStartMS = stringToMs(classStart)
    let nextEndMS = stringToMs(classEnd)
    
    console.log(nextStartMS, nextEndMS);
    if (MS > nextEndMS) { // if class not found, defaulted; already the end of the day
        displayText.title = "Finished"
        displayText.body = "No more class!"
        return
    }

    let currentClass = nextClass - 1
    if (currentClass < 0) { // before any classes started
        displayText.title = "Before School"
        displayText.body = getTimeUntil(nextStartMS, MS)
        return
    }

    let [cClassStart, cClassEnd, cPeriodName] = scheduleHours[currentClass]
    let startMS = stringToMs(cClassStart)
    let endMS = stringToMs(cClassEnd)
    if (MS > startMS && MS < endMS) { // in a class
        displayText.title = cPeriodName || "Period " + currentClass.toString() 
        displayText.body = `Ends in:\n${getTimeUntil(endMS, MS)}`
    } else if (MS > endMS) { // between switching classes
        displayText.title = `Until ${nPeriodName || "Period " + nextClass.toString()}`
        displayText.body = `Starts in:\n${getTimeUntil(nextStartMS, MS)}`
    }
}
function createWidget() {
    const widget = new ListWidget()
    widget.addText(displayText.title)
    widget.addSpacer()
    let multiLineText = displayText.body.split("\n")
    multiLineText.forEach(e => widget.addText(e))
    Script.setWidget(widget)
}

calculateClass()
createWidget()