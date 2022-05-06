const noti = new Notification()

// 10 seconds after 
Timer.schedule(10 * 1000, false, () => {
    noti.setTriggerDate(new Date())
    noti.schedule()
    log("noti should've fired")
})