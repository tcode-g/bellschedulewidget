const noti = new Notification()
noti.title = "Yo"
noti.subtitle = "Sub"
noti.body = "This is some test text!"

// 10 seconds after 
Timer.schedule(10 * 1000, false, () => {
    noti.schedule()
})