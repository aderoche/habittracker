import { saveHabits } from "./storage.js";
import { getDateForDay, getWeekStart } from "./week.js";


export function addHabit(
    habits,
    addButton,
    weekNavigation,
    dataButtons,
    habitList,
    emptyState,
    viewedWeek,
    editingHabit = null,
    editingRow = null
) {

    emptyState.style.display = "none";
    addButton.classList.add("top-right");

    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    document.body.appendChild(backdrop);

    const habitBox = document.createElement("div");
    habitBox.classList.add("habit-card");
    habitBox.style.border = "5px solid #e63946";

    habitBox.innerHTML = `
        <button type="button" id="close-habit">×</button>

        <h2>${editingHabit ? editingHabit.name : "New Habit"}</h2>

        <input type="text" id="habit-name" placeholder="Habit Name">

        <p></p>

        <div class="emoji-palette">
            <button type="button" class="emoji-option selected" data-emoji="💧">💧</button>
            <button type="button" class="emoji-option" data-emoji="📚">📚</button>
            <button type="button" class="emoji-option" data-emoji="🏃">🏃</button>
            <button type="button" class="emoji-option" data-emoji="🎨">🎨</button>
            <button type="button" class="emoji-option" data-emoji="💤">💤</button>
            <button type="button" class="emoji-option" data-emoji="💊">💊</button>
            <button type="button" class="emoji-option" data-emoji="🏞️">🏞️</button>
            <button type="button" class="emoji-option" data-emoji="✍️">✍️</button>
            <button type="button" class="emoji-option" data-emoji="🧺">🧺</button>
            <button type="button" class="emoji-option" data-emoji="💪">💪</button>
            <button type="button" class="emoji-option" data-emoji="💻">💻</button>
            <button type="button" class="emoji-option" data-emoji="🐈">🐈</button>
        </div>

        <input type="hidden" id="habit-emoji" value="💧">

        <div class="color-palette">
            <button type="button" class="color-option" data-color="#e63946"></button>
            <button type="button" class="color-option" data-color="#f4a261"></button>
            <button type="button" class="color-option" data-color="#e9c46a"></button>
            <button type="button" class="color-option" data-color="#2a9d8f"></button>
            <button type="button" class="color-option" data-color="#457b9d"></button>
            <button type="button" class="color-option" data-color="#7b2cbf"></button>
        </div>

        <input type="hidden" id="habit-color" value="#e63946">

        <p></p>

        <label for="target-options">Days per week:</label>

        <div class="target-options">
            <button type="button" class="target-option selected" data-target="1">1</button>
            <button type="button" class="target-option" data-target="2">2</button>
            <button type="button" class="target-option" data-target="3">3</button>
            <button type="button" class="target-option" data-target="4">4</button>
            <button type="button" class="target-option" data-target="5">5</button>
            <button type="button" class="target-option" data-target="6">6</button>
            <button type="button" class="target-option" data-target="7">7</button>
        </div>

        <input type="hidden" id="habit-target" value="1">

        <p></p>

        <textarea
            id="habit-notes"
            placeholder="Add any notes about this habit..."
        ></textarea>

        <p></p>

        <label for="habit-reminder-day">Reminder:</label>

        <div class="reminder-days">
            <button type="button" class="reminder-day" data-day="Sunday">S</button>
            <button type="button" class="reminder-day" data-day="Monday">M</button>
            <button type="button" class="reminder-day" data-day="Tuesday">T</button>
            <button type="button" class="reminder-day" data-day="Wednesday">W</button>
            <button type="button" class="reminder-day" data-day="Thursday">T</button>
            <button type="button" class="reminder-day" data-day="Friday">F</button>
            <button type="button" class="reminder-day" data-day="Saturday">S</button>
        </div>

        <input type="time" id="habit-reminder">

        <p></p>

        <button id="save-habit">
            ${editingHabit ? "Update Habit" : "Save Habit"}
        </button>
    `;

    document.body.appendChild(habitBox);
        const reminderDayButtons =
        habitBox.querySelectorAll(".reminder-day");

    reminderDayButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            button.classList.toggle("selected");
        });
    });


    const nameInput =
        habitBox.querySelector("#habit-name");

    const heading =
        habitBox.querySelector("h2");

    nameInput.addEventListener("input", function() {
        heading.textContent =
            nameInput.value || "Edit Habit";
    });


    const emojiOptions =
        habitBox.querySelectorAll(".emoji-option");

    const emojiInput =
        habitBox.querySelector("#habit-emoji");

    emojiOptions.forEach(function(option) {

        option.addEventListener("click", function() {

            if (option.classList.contains("selected")) {

                option.classList.remove("selected");
                emojiInput.value = "";

            } else {

                emojiOptions.forEach(function(emoji) {
                    emoji.classList.remove("selected");
                });

                option.classList.add("selected");
                emojiInput.value = option.dataset.emoji;
            }
        });
    });


    const colorOptions =
        habitBox.querySelectorAll(".color-option");

    const colorInput =
        habitBox.querySelector("#habit-color");

    colorOptions.forEach(function(option) {

        option.addEventListener("click", function() {

            colorInput.value = option.dataset.color;

            habitBox.style.borderColor =
                option.dataset.color;

            colorOptions.forEach(function(color) {
                color.classList.remove("selected");
            });

            option.classList.add("selected");
        });
    });


    const targetOptions =
        habitBox.querySelectorAll(".target-option");

    const targetInput =
        habitBox.querySelector("#habit-target");

    targetOptions.forEach(function(option) {

        option.addEventListener("click", function() {

            targetInput.value =
                option.dataset.target;

            targetOptions.forEach(function(target) {
                target.classList.remove("selected");
            });

            option.classList.add("selected");
        });
    });
        const saveButton =
        habitBox.querySelector("#save-habit");

    saveButton.addEventListener("click", function() {

        saveHabit(
            habitBox,
            backdrop,
            habits,
            weekNavigation,
            dataButtons,
            habitList,
            emptyState,
            addButton,
            viewedWeek,
            editingHabit,
            editingRow
        );
    });


        // Close

    const closeButton =
        habitBox.querySelector("#close-habit");

    closeButton.addEventListener("click", function() {

        habitBox.remove();
        backdrop.remove();

    });


    // Fill in existing habit when editing

    if (editingHabit) {

        // Name

        habitBox.querySelector("#habit-name").value =
            editingHabit.name;

        habitBox.querySelector("h2").textContent =
            editingHabit.name;


        // Emoji

        habitBox.querySelector("#habit-emoji").value =
            editingHabit.emoji;

        const editEmojiOptions =
            habitBox.querySelectorAll(".emoji-option");

        editEmojiOptions.forEach(function(option) {

            option.classList.remove("selected");

            if (
                option.dataset.emoji ===
                editingHabit.emoji
            ) {

                option.classList.add("selected");

            }

        });


        // Color

        habitBox.querySelector("#habit-color").value =
            editingHabit.color;

        const editColorOptions =
            habitBox.querySelectorAll(".color-option");

        editColorOptions.forEach(function(option) {

            option.classList.remove("selected");

            if (
                option.dataset.color ===
                editingHabit.color
            ) {

                option.classList.add("selected");

            }

        });

        habitBox.style.border =
            `5px solid ${editingHabit.color}`;


        // Target

        habitBox.querySelector("#habit-target").value =
            editingHabit.target;

        const editTargetOptions =
            habitBox.querySelectorAll(".target-option");

        editTargetOptions.forEach(function(option) {

            option.classList.remove("selected");

            if (
                option.dataset.target ===
                String(editingHabit.target)
            ) {

                option.classList.add("selected");

            }

        });


        // Notes

        habitBox.querySelector("#habit-notes").value =
            editingHabit.notes;


        // Reminder time

        habitBox.querySelector("#habit-reminder").value =
            editingHabit.reminder;


        // Reminder days

        const editReminderButtons =
            habitBox.querySelectorAll(".reminder-day");

        editReminderButtons.forEach(function(button) {

            button.classList.remove("selected");

            if (
                editingHabit.reminderDays &&
                editingHabit.reminderDays.includes(
                    button.dataset.day
                )
            ) {

                button.classList.add("selected");

            }

        });

    }

}
function saveHabit(
    habitBox,
    backdrop,
    habits,
    weekNavigation,
    dataButtons,
    habitList,
    emptyState,
    addButton,
    viewedWeek,
    editingHabit,
    editingRow
) {

    const habitName =
        habitBox.querySelector("#habit-name").value;

    const emoji =
        habitBox.querySelector("#habit-emoji").value;

    const color =
        habitBox.querySelector("#habit-color").value;
    
    const target =
        Number(
            habitBox.querySelector("#habit-target").value
        );

    const notes =
        habitBox.querySelector("#habit-notes").value;


    const reminderDays = [];

    const reminderDayButtons =
        habitBox.querySelectorAll(".reminder-day");

    reminderDayButtons.forEach(function(button) {

        if (button.classList.contains("selected")) {
            reminderDays.push(button.dataset.day);
        }

    });


    const reminder =
        habitBox.querySelector("#habit-reminder").value;


    const habit = {

        name: habitName,

        emoji: emoji,

        color: color,

        target: target,

        notes: notes,

        reminder: reminder,

        reminderDays: reminderDays,

        completions: editingHabit
            ? editingHabit.completions
            : [],

        weekStarted: editingHabit
            ? editingHabit.weekStarted
            : getWeekStart()

    };


    // Editing an existing habit

    if (editingHabit) {

        Object.assign(editingHabit, habit);

        const index =
            habits.indexOf(editingHabit);

        habits[index] =
            editingHabit;

        saveHabits(habits);

        editingRow.remove();

        displayHabit(
            editingHabit,
            habits,
            habitList,
            emptyState,
            addButton,
            weekNavigation,
            dataButtons,
            viewedWeek
        );

        habitBox.remove();
        backdrop.remove();

        return;
    }


    // Creating a new habit

    habits.push(habit);

    weekNavigation.classList.remove("hidden");

    dataButtons.classList.remove("empty");

    saveHabits(habits);

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

    habitBox.remove();
    backdrop.remove();

}
export function displayHabit(
    habit,
    habits,
    habitList,
    emptyState,
    addButton,
    weekNavigation,
    dataButtons,
    viewedWeek
) {

    let reminderDisplay = "";

    if (
        habit.reminderDays &&
        habit.reminderDays.length > 0 &&
        habit.reminder
    ) {

        reminderDisplay =
            `🔔 ${habit.reminderDays.join(", ")} at ${habit.reminder}`;

    }


    const start =
        new Date(viewedWeek);

    const end =
        new Date(start);

    end.setDate(
        start.getDate() + 6
    );

    end.setHours(
        23,
        59,
        59,
        999
    );


    const completedThisWeek =
        habit.completions.filter(function(date) {

            const completionDate =
                new Date(date);

            return (
                completionDate >= start &&
                completionDate <= end
            );

        }).length;


    const habitRow =
        document.createElement("div");

    habitRow.classList.add("habit-row");

    habitRow.style.setProperty(
        "--habit-color",
        habit.color
    );

    habitRow.style.border =
        `3px solid ${habit.color}`;


    habitRow.innerHTML = `

        <div class="habit-actions">

            <button
                type="button"
                class="edit-habit"
            >
                ✏️
            </button>

            <button
                type="button"
                class="delete-habit"
            >
                🗑️
            </button>

        </div>


        <div class="habit-header">

            <span class="habit-icon">
                ${habit.emoji}
            </span>

            <h2>
                ${habit.name}
            </h2>

        </div>


        <div class="week-days">

            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>

        </div>


        <div class="completion-days">

            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>
            <button type="button" class="day-button">✓</button>

        </div>


        <p class="progress">
            ${completedThisWeek} / ${habit.target} days
        </p>


        <p class="habit-notes">
            ${habit.notes}
        </p>


        <p class="habit-reminder">
            ${reminderDisplay}
        </p>

    `;


    habitList.appendChild(habitRow);


    // Delete

    const deleteButton =
        habitRow.querySelector(".delete-habit");

    deleteButton.addEventListener("click", function() {

        const confirmed =
            confirm(
                "Are you sure you want to delete this habit?"
            );

        if (!confirmed) {
            return;
        }


        habitRow.remove();

        const index =
            habits.indexOf(habit);

        habits.splice(index, 1);

        saveHabits(habits);


        if (habits.length === 0) {

            emptyState.style.display =
                "block";

            addButton.classList.remove(
                "top-right"
            );

            weekNavigation.classList.add(
                "hidden"
            );

            dataButtons.classList.add(
                "empty"
            );

        }

    });


    // Edit

    const editButton =
        habitRow.querySelector(".edit-habit");

    editButton.addEventListener("click", function() {

        editHabit(
            habit,
            habitRow,
            habits,
            addButton,
            weekNavigation,
            dataButtons,
            habitList,
            emptyState,
            viewedWeek
        );

    });


    // Completion buttons

    const dayButtons =
        habitRow.querySelectorAll(".day-button");

    dayButtons.forEach(function(button, index) {

        const date =
            getDateForDay(
                viewedWeek,
                index
            );


        if (
            habit.completions.includes(date)
        ) {

            button.classList.add(
                "completed"
            );

        }


        button.addEventListener("click", function() {

            const completionIndex =
                habit.completions.indexOf(date);


            if (completionIndex === -1) {

                habit.completions.push(date);

                button.classList.add(
                    "completed"
                );

            } else {

                habit.completions.splice(
                    completionIndex,
                    1
                );

                button.classList.remove(
                    "completed"
                );

            }


            updateHabitProgress(
                habit,
                habitRow,
                viewedWeek
            );

            saveHabits(habits);

        });

    });

}
function editHabit(
    habit,
    habitRow,
    habits,
    addButton,
    weekNavigation,
    dataButtons,
    habitList,
    emptyState,
    viewedWeek
) {

    addHabit(
        habits,
        addButton,
        weekNavigation,
        dataButtons,
        habitList,
        emptyState,
        viewedWeek,
        habit,
        habitRow
    );

}
function updateHabitProgress(
    habit,
    habitRow,
    viewedWeek
) {

    const start =
        new Date(viewedWeek);

    const end =
        new Date(start);

    end.setDate(
        start.getDate() + 6
    );

    end.setHours(
        23,
        59,
        59,
        999
    );


    const completedThisWeek =
        habit.completions.filter(function(date) {

            const completionDate =
                new Date(date);

            return (
                completionDate >= start &&
                completionDate <= end
            );

        }).length;


    const progress =
        habitRow.querySelector(".progress");

    progress.textContent =
        `${completedThisWeek} / ${habit.target} days`;

}