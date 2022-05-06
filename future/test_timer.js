const noti = new Notification()
noti.title = "Yo"
noti.subtitle = "Sub"
noti.body = "This is some test text!"

// 10 seconds after 
Timer.schedule(10 * 1000, false, () => {
    noti.setTriggerDate(new Date())
    noti.schedule()
    log("noti should've fired")
})