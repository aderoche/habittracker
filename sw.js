self.addEventListener("install", function(event){
    console.log("Service worker installed.");
});

self-addEventListener("activate", function(event){
    console.log("Service worker activated.");
});
self.addEventListener("message", function(event) {

    if (event.data.type === "REMINDER") {

        const habit = event.data.habit;

        self.registration.showNotification(
            "Habit Reminder 🔔",
            {
                body: `${habit.emoji} ${habit.name}`,
                tag: `habit-${habit.name}`
            }
        );

    }

});
self.addEventListener("notificationclick", function(event) {

    console.log("Notification clicked!");

    event.notification.close();

    event.waitUntil(
        clients.openWindow("./index.html")
    );

});