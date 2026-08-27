export function checkReminders(habits) {

    const now = new Date();

    const currentDay =
        now.toLocaleDateString("en-US", {
            weekday: "long"
        });

    const currentTime =
        now.toTimeString().slice(0, 5);


    habits.forEach(function(habit) {

        if (
            habit.reminderDays &&
            habit.reminderDays.includes(currentDay) &&
            habit.reminder === currentTime
        ) {

            sendReminder(
                habit,
                currentDay
            );

        }

    });

}


function sendReminder(habit, currentDay) {

    const reminderKey =
        `${habit.name}-${currentDay}-${habit.reminder}-${new Date().toDateString()}`;


    if (localStorage.getItem(reminderKey)) {
        return;
    }


    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification("Habit Reminder 🔔", {
            body: `${habit.emoji} ${habit.name}`
        });

        localStorage.setItem(
            reminderKey,
            "sent"
        );

    }

}