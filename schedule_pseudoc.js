const noti = new Notification()
noti.title = "Yo"
noti.subtitle = "Sub"
noti.body = "This is some test text!"

// 10 seconds after 
Timer.schedule(10 * 1000, false, () => {
    noti.schedule()
})


/* pseudocode for code renovation
 * 
 * establish schedule hours for the day
 * establish the special days that have their own scedule
 * 
 * creat function to get the shedule for this day
 * 
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

const currentDate = new Date()


function getTodaysSchedule() {
  var todaysSchedule = null
  for (let day in specialDays) {
    let formattedDate = (currentDate.getMonth()+1).toString() + "/" + currentDate.getDate().toString()
    if (formattedDate == day) {
      todaysSchedule = scheduleTimes[specialDays[day]]
      break
    }
  }
  if (!todaysSchedule) {
    todaysSchedule = scheduleTimes[(currentDate.getDay()) == 3 ? "Wednesday" : "Regular"]
  }
}
function getCurrentClass() {
  if (!todaysSchedule) return;
  
}












