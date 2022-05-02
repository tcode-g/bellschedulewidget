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
    

    // get the nextClass and currentClass
    let nextClass = scheduleHours.length-1;
    for(let i = 0; i < scheduleHours.length; i++) {
        let classStart = convertTimeToMilli(scheduleHours[i][0])
        if (MILLI < classStart) {
            nextClass = i
            break
        }
    }

    let [classStart, classEnd, Period] = scheduleHours[nextClass]
    if (MILLI > convertTimeToMilli(classEnd)) {
        displayText.title = "Finished"
        displayText.body = "No more class!"
        return
    }
    
    let nextClassMilli = convertTimeToMilli(classStart)
    let currentClass = (MILLI > nextClassMilli) ? nextClass : nextClass-1;
    if (currentClass < 0) {
        displayText.title = "Before School"
        displayText.body = getTimeUntil(nextClassMilli, MILLI)
        return
    }

    [classStart, classEnd, Period] = scheduleHours[currentClass]
    startClass = convertTimeToMilli(classStart)
    endClass = convertTimeToMilli(classEnd)

    if (MILLI > startClass && MILLI < endClass) { 
        // in class
        displayText.title = Period || "Period " + (currentClass+1).toString() 
        displayText.body = `Ends in:\n${getTimeUntil(endClass, MILLI)}`

    } else if (MILLI > endClass) { 
        // switching periods
        displayText.title = `Until ${Period || "Period " + nextClass.toString()}`
        displayText.body = `Starts in:\n${getTimeUntil(nextClassMilli, MILLI)}`
    }
}
async function createWidget() {
    const widget = new ListWidget()
    let header = widget.addText(displayText.title)
    header.textColor = Color.black()
    widget.addSpacer(70)
    let multiLineText = displayText.body.split("\n")
    multiLineText.forEach(e => widget.addText(e).textColor = Color.black())
    widget.refreshAfterDate = new Date(Date.now() * 120 * 1000)

    let backg = null

    try {
        backg = await new Request("https://i.imgur.com/VlVW18w.jpg").loadImage()
        widget.backgroundImage = backg
    } catch (e) {
        backg = new Color("FF")
        widget.backgroundColor = backg
    }
    Script.setWidget(widget)
}

calculateClasses()
await createWidget()

