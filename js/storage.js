export function saveHabits(habits) {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );

}