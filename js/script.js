import { saveHabits } from "./storage.js";
import { getWeekStart, updateWeekLabel } from "./week.js";
import { displayHabit, addHabit } from "./habits.js";
import { checkReminders } from "./reminders.js";


const savedHabits =
    localStorage.getItem("habits");

const habits =
    savedHabits
        ? JSON.parse(savedHabits)
        : [];


const weekNavigation =
    document.querySelector("#week-navigation");

const addButton =
    document.querySelector("#add-button");

const habitList =
    document.querySelector("#habit-list");

const emptyState =
    document.querySelector("#empty-state");

const dataButtons =
    document.querySelector(".data-buttons");


let viewedWeek =
    getWeekStart();


// ADD HABIT

addButton.addEventListener("click", function() {

    addHabit(
        habits,
        addButton,
        weekNavigation,
        dataButtons,
        habitList,
        emptyState,
        viewedWeek
    );

});


// RENDER HABITS

function renderHabits() {

    habitList.innerHTML = "";

    habits.forEach(function(habit) {

        displayHabit(
            habit,
            habits,
            habitList,
            emptyState,
            addButton,
            weekNavigation,
            dataButtons,
            viewedWeek
        );

    });

    updateWeekLabel(viewedWeek);

}


// INITIAL DISPLAY

renderHabits();


if (habits.length > 0) {

    emptyState.style.display = "none";

    addButton.classList.add("top-right");

    weekNavigation.classList.remove("hidden");

    dataButtons.classList.remove("empty");

} else {

    weekNavigation.classList.add("hidden");

    dataButtons.classList.add("empty");

}


// WEEK NAVIGATION

document
    .querySelector("#previous-week")
    .addEventListener("click", function() {

        const previousWeek =
            new Date(viewedWeek);

        previousWeek.setDate(
            previousWeek.getDate() - 7
        );

        viewedWeek =
            previousWeek.toISOString();

        renderHabits();

    });


document
    .querySelector("#next-week")
    .addEventListener("click", function() {

        const nextWeek =
            new Date(viewedWeek);

        nextWeek.setDate(
            nextWeek.getDate() + 7
        );

        viewedWeek =
            nextWeek.toISOString();

        renderHabits();

    });


// NOTIFICATIONS

if (
    "Notification" in window &&
    Notification.permission === "default"
) {

    Notification.requestPermission();

}


setInterval(function() {

    checkReminders(habits);

}, 1000);


// IMPORT / EXPORT

const exportButton =
    document.querySelector("#export-button");

const importButton =
    document.querySelector("#import-button");

const importFile =
    document.querySelector("#import-file");


// EXPORT

exportButton.addEventListener("click", function() {

    const data =
        JSON.stringify(
            habits,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type: "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "habit-tracker-backup.json";

    link.click();

    URL.revokeObjectURL(url);

});


// IMPORT

importButton.addEventListener("click", function() {

    importFile.click();

});


importFile.addEventListener("change", function() {

    const file =
        importFile.files[0];

    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            try {

                const importedHabits =
                    JSON.parse(
                        event.target.result
                    );


                if (
                    !Array.isArray(
                        importedHabits
                    )
                ) {

                    alert(
                        "Invalid habit tracker file."
                    );

                    return;

                }


                habits.length = 0;


                importedHabits.forEach(
                    function(habit) {

                        habits.push(habit);

                    }
                );


                saveHabits(habits);

                location.reload();


            } catch (error) {

                alert(
                    "Could not import this file."
                );

            }

        };


    reader.readAsText(file);

});