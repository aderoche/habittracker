export function getWeekStart() {

    const today = new Date();
    const day = today.getDay();

    const sunday = new Date(today);

    sunday.setDate(
        today.getDate() - day
    );

    sunday.setHours(0, 0, 0, 0);

    return sunday.toISOString();

}


export function getDateForDay(weekStart, index) {

    const date = new Date(weekStart);

    date.setDate(
        date.getDate() + index
    );

    return date.toISOString().split("T")[0];

}


export function updateWeekLabel(viewedWeek) {

    const start = new Date(viewedWeek);

    const end = new Date(start);

    end.setDate(
        start.getDate() + 6
    );

    const options = {
        month: "short",
        day: "numeric"
    };

    const startText =
        start.toLocaleDateString("en-US", options);

    const endText =
        end.toLocaleDateString("en-US", options);

    document.querySelector("#week-label").textContent =
        `${startText} - ${endText}`;

}